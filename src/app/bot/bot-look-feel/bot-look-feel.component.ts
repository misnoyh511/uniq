import { Component, OnInit, KeyValueChanges, KeyValueDiffer, KeyValueDiffers, DoCheck } from '@angular/core';
import {AppConfig} from '../../app.config';
import {ConversationsService} from '../../conversations/conversations.service';
import {BotService} from '../bot.service';
import {Router} from '@angular/router';
import {NewBotService} from '../../new-bot/new-bot.service';

@Component({
  selector: 'app-bot-look-feel',
  templateUrl: 'bot-look-feel.component.html',
  styleUrls: ['./bot-look-feel.component.css'],
  providers: [ConversationsService, BotService, NewBotService]
})
export class botLookFeelComponent implements OnInit, DoCheck {
  latteralTab = true;
  showBotName = false;
  showChatName = false;
  showWelcome = false;
  showTitle = false;
  showWaiting = false;
  showAvatar = false;
  showCover = false;
  showBackClr = false;
  showFontClr = false;
  botData: any = {};
  imageUrl: any;
  coverUrl: any;
  imagePreview: any;
  coverPreview: any;
  file: any[];
  analytics_token: string;
  tokenDiffer: KeyValueDiffer<string, any>;
  constructor(private router: Router, private differs: KeyValueDiffers, public conversationsService: ConversationsService,
              private botService: BotService, public newBotService: NewBotService ) { }

  ngOnInit() {
    this.analytics_token = localStorage.getItem('ANALYTICS_TOKEN');
    this.tokenDiffer = this.differs.find(AppConfig.TOKEN).create();
    this.conversationsService.registerStringBroadcast();
    this.botData = JSON.parse(localStorage.getItem('CURRENT_BOT'));
  }

  tokenChanged(changes: KeyValueChanges<string, any>) {
    this.analytics_token = localStorage.getItem('ANALYTICS_TOKEN');
    this.botData = JSON.parse(localStorage.getItem('CURRENT_BOT'));
  }

  ngDoCheck(): void {
    const changes = this.tokenDiffer.diff(AppConfig.TOKEN);
    if (changes) {
      this.tokenChanged(changes);
    }
  }

  editBot() {
    this.botService.editBot(this.botData).subscribe((data) => {
      console.log('data', data);
      this.router.navigate(['/bot-home']);
    }, (err) => {
      console.log(err);
    });
  }

  fileChangeEvent(fileInput: any, role) {
    this.file = fileInput.target.files;
    if (role === 'avatar') {
      this.imageUrl = this.file[0].name;
    }
    if (role === 'cover') {
      this.coverUrl = this.file[0].name;
    }
    this.getBase64(this.file[0], role);
  }

  getBase64(file, role) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (role === 'avatar') {
        this.imagePreview = reader.result;
      }
      if (role === 'cover') {
        this.coverPreview = reader.result;
      }
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
    this.uploadImage(role);
  }

  uploadImage(role) {
    const formData = new FormData();
    if (this.file) {
      for (let i = 0; i < this.file.length; i++) {
        formData.append('file', this.file[i], this.file[i].name);
      }
      formData.append('role', role);

      this.newBotService.upload(formData).subscribe((response) => {
          console.log('response', response);
        },
        (error) => {
          console.log('error', error);
        });
    }
  }

  deleteImage(role) {
    if (role === 'avatar') {
      this.imageUrl = '';
    }
    if (role === 'cover') {
      this.coverUrl = '';
    }
  }

}
