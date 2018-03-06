import {Component, OnInit, Pipe, PipeTransform, KeyValueChanges, KeyValueDiffer, KeyValueDiffers, DoCheck} from '@angular/core';
import {ConversationsService} from '../conversations.service';
import {AppConfig} from '../../app.config';


@Component({
  selector: 'app-transcripts',
  templateUrl: 'transcripts.component.html',
  styleUrls: ['./transcripts.component.css'],
  providers: [ConversationsService]
})
export class TranscriptsComponent implements OnInit, DoCheck {

  transcripts: any = [];
  date: any;
  showDialog = false;
  showTooltip = false;
  totalMsgs = [];
  startTime: any;
  analytics_token: string;
  tokenDiffer: KeyValueDiffer<string, any>;

  constructor(private conversationsService: ConversationsService, private differs: KeyValueDiffers) {
  }

  ngOnInit() {
    this.analytics_token = localStorage.getItem('ANALYTICS_TOKEN');
    this.tokenDiffer = this.differs.find(AppConfig.TOKEN).create();
    this.conversationsService.registerStringBroadcast();
    this.getTranscripts();
  }

  tokenChanged(changes: KeyValueChanges<string, any>) {
    this.analytics_token = localStorage.getItem('ANALYTICS_TOKEN');
    this.getTranscripts();
  }

  ngDoCheck(): void {
    const changes = this.tokenDiffer.diff(AppConfig.TOKEN);
    if (changes) {
      this.tokenChanged(changes);
    }
  }

  getTranscripts() {
    this.conversationsService.getTranscripts().subscribe((response) => {
      this.transcripts = [];
      console.log('getTranscripts', response);
      if (response.data && response.data.length) {
        this.transcripts.push({
          client: response.data[0].client,
          session_id: response.data[0].session_id,
          created_at: response.data[0].created_at,
          msg_in: [],
          msg_out: [],
          totalMsgs: [{msg: response.data[0].text, created_at: response.data[0].created_at, type: response.data[0].type}]
        });
        if (response.data[0].type === 'incoming') {
          this.transcripts[0].msg_in.push({msg: response.data[0].text, created_at: response.data[0].created_at});
        } else {
          this.transcripts[0].msg_out.push({msg: response.data[0].text, created_at: response.data[0].created_at});
        }

        for (let i = 1; i < response.data.length; i++) {
          const alreadyExistsAt = this.existsAt(this.transcripts, 'session_id', response.data[i].session_id);
          if (alreadyExistsAt !== false) {
            if (response.data[i].type === 'incoming') {
              this.transcripts[alreadyExistsAt].msg_in.push({msg: response.data[i].text, created_at: response.data[i].created_at});
            } else {
              this.transcripts[alreadyExistsAt].msg_out.push({msg: response.data[i].text, created_at: response.data[i].created_at});
            }
            this.transcripts[alreadyExistsAt].totalMsgs.push({
              msg: response.data[i].text, created_at: response.data[i].created_at, type: response.data[i].type
            });
          } else {
            this.transcripts.push({
              client: response.data[i].client,
              created_at: response.data[i].created_at,
              session_id: response.data[i].session_id,
              msg_in: [],
              msg_out: [],
              totalMsgs: [{msg: response.data[i].text, created_at: response.data[i].created_at, type: response.data[i].type}]
            });
            if (response.data[i].type === 'incoming') {
              this.transcripts[this.transcripts.length - 1].msg_in.push({
                msg: response.data[i].text,
                created_at: response.data[i].created_at
              });
            } else {
              this.transcripts[this.transcripts.length - 1].msg_out.push({
                msg: response.data[i].text,
                created_at: response.data[i].created_at
              });
            }
          }
        }
      }

    }, (err) => {
      console.log(err);
    });
  }

  existsAt(array, key, value) {
    for (let i = 0; i < array.length; i++) {
      if (array[i][key] === value) {
        return i;
      }
    }
    return false;
  }

  openChatBox(transcript) {
    this.totalMsgs = transcript.totalMsgs;
    this.startTime = transcript.created_at;
  }

}

@Pipe({
  name: 'sort'
})
export class ArraySortPipe  implements PipeTransform {
  transform(array: any[], field: string): any[] {
    array.sort((a: any, b: any) => {
      if (a[field] < b[field]) {
        return -1;
      } else if (a[field] > b[field]) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }
}
