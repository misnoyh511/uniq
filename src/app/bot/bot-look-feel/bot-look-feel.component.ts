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
  avatarFile: any[];
  coverFile: any[];
  analytics_token: string;
  floatingIcon = false;
  tokenDiffer: KeyValueDiffer<string, any>;
  constructor(private router: Router, private differs: KeyValueDiffers, public conversationsService: ConversationsService,
              private botService: BotService, public newBotService: NewBotService ) { }

  ngOnInit() {
    this.analytics_token = localStorage.getItem('ANALYTICS_TOKEN');
    this.tokenDiffer = this.differs.find(AppConfig.TOKEN).create();
    this.conversationsService.registerStringBroadcast();
    this.botData = JSON.parse(localStorage.getItem('CURRENT_BOT'));
    /*this.botData.tab_color = this.rgb2hex(this.botData.tab_color);
    this.botData.tab_text_color = this.botData.icon_color = this.rgb2hex(this.botData.tab_text_color);*/
    if (this.botData.avatar_icon) {
      this.imageUrl = this.botData.avatar_icon;
      this.imagePreview = this.botData.avatar_icon;
    }
    if (this.botData.cover_image) {
      this.coverUrl = this.botData.cover_image;
      this.coverPreview = this.botData.cover_image;
    }

  }

  /*rgb2hex(rgb) {
    rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
    return (rgb && rgb.length === 4) ? '#' +
      ('0' + parseInt(rgb[1], 10).toString(16)).slice(-2) +
      ('0' + parseInt(rgb[2], 10).toString(16)).slice(-2) +
      ('0' + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
  }

  hexToRgb(hex) {
    let c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      c = hex.substring(1).split('');
      if (c.length === 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c = '0x' + c.join('');
      return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255] + ')';
    }
    throw new Error('Bad Hex');
  }*/

  tokenChanged(changes: KeyValueChanges<string, any>) {
    this.analytics_token = localStorage.getItem('ANALYTICS_TOKEN');
    this.botData = JSON.parse(localStorage.getItem('CURRENT_BOT'));
    console.log('bot data ================', this.botData);
    /*this.botData.tab_color = this.rgb2hex(this.botData.tab_color);
    this.botData.tab_text_color = this.botData.icon_color = this.rgb2hex(this.botData.tab_text_color);*/
    if (this.botData.avatar_icon) {
      this.imageUrl = this.botData.avatar_icon;
      this.imagePreview = this.botData.avatar_icon;
    }
    if (this.botData.cover_image) {
      this.coverUrl = this.botData.cover_image;
      this.coverPreview = this.botData.cover_image;
    }
  }

  ngDoCheck(): void {
    const changes = this.tokenDiffer.diff(AppConfig.TOKEN);
    if (changes) {
      this.tokenChanged(changes);
    }
  }

  latteralToggle() {
    this.floatingIcon = !this.latteralTab;
  }

  floatingToggle() {
    this.latteralTab = !this.floatingIcon;
  }

  editBot() {
    if (this.latteralTab) {
      this.botData.icon_tab = false;
    }
    if (this.floatingIcon) {
      this.botData.icon_tab = true;
    }
    /*this.botData.tab_color = this.hexToRgb(this.botData.tab_color);
    this.botData.tab_text_color = this.botData.icon_color = this.hexToRgb(this.botData.tab_text_color);*/
    const bot = {
      chat_window_name: this.botData.chat_window_name,
      icon_tab: this.botData.icon_tab,
      initial_greeting: this.botData.initial_greeting,
      input_title: this.botData.input_title,
      waiting_msg: this.botData.waiting_msg,
      tab_color: this.botData.tab_color,
      tab_text_color: this.botData.tab_text_color,
      icon_color: this.botData.tab_text_color,
      operator_name: this.botData.operator_name
    }
    this.botService.editBot(bot, this.botData.id).subscribe((data) => {
      localStorage.setItem('CURRENT_BOT', JSON.stringify(data));
      this.botData = data;
      this.router.navigate(['/bot-home']);
    }, (err) => {
      console.log(err);
    });
  }

  avatarChangeEvent(fileInput: any) {
    this.avatarFile = fileInput.target.files;
    this.imageUrl = this.avatarFile[0].name;
    this.getAvatarBase64(this.avatarFile[0]);
  }

  getAvatarBase64(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  coverChangeEvent(fileInput: any) {
    this.coverFile = fileInput.target.files;
    this.coverUrl = this.coverFile[0].name;
    this.getCoverBase64(this.coverFile[0]);
  }

  getCoverBase64(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.coverPreview = reader.result;
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  uploadAvatarImage() {
    const formData = new FormData();
    if (this.avatarFile) {
      for (let i = 0; i < this.avatarFile.length; i++) {
        formData.append('file', this.avatarFile[i], this.avatarFile[i].name);
      }
      formData.append('role', 'avatar');

      this.newBotService.upload(formData).subscribe((response) => {
          console.log('response', response);
        },
        (error) => {
          console.log('error', error);
        });
    }
  }

  uploadCoverImage() {
    const formData = new FormData();
    if (this.coverFile) {
      for (let i = 0; i < this.coverFile.length; i++) {
        formData.append('file', this.coverFile[i], this.coverFile[i].name);
      }
      formData.append('role', 'cover');

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
