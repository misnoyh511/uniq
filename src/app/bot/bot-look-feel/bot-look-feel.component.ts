import { Component, OnInit, OnDestroy } from '@angular/core';
import {BotService} from '../bot.service';
import {Router} from '@angular/router';
import {NewBotService} from '../../new-bot/new-bot.service';
import {SidebarService} from '../../shared/sidebar/sidebar.service';
import {SnackBarService} from '../../snack-bar/snack-bar.service';

@Component({
  selector: 'app-bot-look-feel',
  templateUrl: 'bot-look-feel.component.html',
  styleUrls: ['./bot-look-feel.component.css'],
  providers: [BotService, NewBotService]
})
export class botLookFeelComponent implements OnInit, OnDestroy {
  latteralTab: boolean;
  showBotName = false;
  showChatName = false;
  showWelcome = false;
  showTitle = false;
  showWaiting = false;
    showTab = false;
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
  floatingIcon: boolean;
  constructor(private router: Router, private botService: BotService, public newBotService: NewBotService,
              private sbs: SidebarService, public snackBarService: SnackBarService) { }

  ngOnInit() {
    this.botData.medium_ids = [null, null];
    if (this.sbs.savedData) {
      this.botData = this.sbs.savedData;
      this.getImage();
    }
    this.sbs.botList.subscribe((data) => {
      this.botData = data[0];
      this.getImage();
    });

    this.sbs.botData.subscribe((data) => {
      this.botData = data;
      this.getImage();
    });
  }

  getImage() {
      this.imageUrl = '';
      this.coverUrl = '';
      this.imagePreview = '';
      this.coverPreview = '';
    this.floatingIcon = this.botData.icon_tab;
    this.latteralTab = !this.botData.icon_tab;
    if (this.botData.avatar_icon) {
      this.imageUrl = this.botData.avatar_icon;
      this.imagePreview = this.botData.avatar_icon;
    }
    if (this.botData.cover_image) {
      this.coverUrl = this.botData.cover_image;
      this.coverPreview = this.botData.cover_image;
    }
    this.botData['medium_ids'] = [null, null];
  }

  ngOnDestroy() {
    this.sbs.savedData = this.botData;
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
    const bot = {
      chat_window_name: this.botData.chat_window_name,
      icon_tab: this.botData.icon_tab,
      initial_greeting: this.botData.initial_greeting,
      input_title: this.botData.input_title,
      waiting_msg: this.botData.waiting_msg,
      tab_color: this.botData.tab_color,
      tab_text_color: this.botData.tab_text_color,
      icon_color: this.botData.tab_text_color,
      operator_name: this.botData.operator_name,
      medium_ids: this.botData.medium_ids,
        tab_name: this.botData.tab_name
    };
    this.botService.editBot(bot, this.botData.id).subscribe((data) => {
      this.botData = data;
      this.snackBarService.openSnackBar('Bot Updated');
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
    this.uploadAvatarImage();
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
    this.uploadCoverImage();
  }

  uploadAvatarImage() {
    const formData = new FormData();
    if (this.avatarFile) {
      for (let i = 0; i < this.avatarFile.length; i++) {
        formData.append('file', this.avatarFile[i], this.avatarFile[i].name);
      }
      formData.append('role', 'avatar');

      this.newBotService.upload(formData).subscribe((response) => {
          this.botData.medium_ids[0] = response.media[0].id;
          this.snackBarService.openSnackBar('Avatar Image Uploaded');
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
              this.botData.medium_ids[1] = response.media[0].id;
          this.snackBarService.openSnackBar('Cover Image Uploaded');
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
