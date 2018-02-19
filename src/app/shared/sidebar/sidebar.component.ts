import { Component, OnInit, Input } from '@angular/core';
import {SidebarService} from "./sidebar.service";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [SidebarService ],
})
export class SidebarComponent implements OnInit {
  @Input() navType;
  @Input() getUrl;
  bot: any[];
  name : String;
  data: any;
  topMessagesIn: any = [];
  options: any = {};
  id:any;
  botId : any;
  linkUrl: any;
  showLink = false;
  showLink1 = false;
  constructor(private Service: SidebarService,private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.onloaddata();
    if(!this.data) {
      this.data = "Bot Providencia";
    }
  }
  select() {
    //for(let i = 0 ; i < ul.length ; i++)
    this.showLink = true;
    this.showLink1 = false;
  }
  /*select1() {
    this.showLink1 = true;
    this.showLink = false;
}*/
  onloaddata() {
   this.Service.getBot().subscribe((data) => {
     this.bot = data;
     if (this.bot.length > 0) {
       this.data = this.bot[0].analytics_token;
     }
   });
  }
  dropDown(getUrl){
    if(getUrl.split("/")[2]) {
      this.linkUrl = '/' + getUrl.split("/")[1];
    } else {
      delete this.linkUrl;
    }

  /*  this.route.params.subscribe((params) => {
      this.botId = params['id'];
      console.log("qsdwfevgrhnjmj,kdjhryjy",this.botId);
    });*/
     /* if (this.router.url.indexOf('top-messages-in') > -1) {
        console.log('hghgh',g);
      }*/
     if(this.data){
      localStorage.setItem('ANALYTICS_TOKEN', this.data);
     }

  }
}
