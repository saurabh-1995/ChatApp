import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../api-call.service';
import { Router } from '../../../node_modules/@angular/router';



@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit {

  constructor(private service: ApiCallService, private routes:Router) { }
  public chatChannels = "";
  public textmessage: String = "";
  public isChannelFound: string = "";
  public groupMsg = [];
  groupObject;
  public id =localStorage.getItem('id');
  public name =localStorage.getItem('name');
  public email=localStorage.getItem('email');



  mainChannel() {

    this.service.createChannel(this.chatChannels).subscribe(reserve => {


      this.groupObject = reserve.unique_name;
      this.displayChannelList();
      console.log(reserve);
    },
      err => {
        console.log(err);
      }
    );
  }
  //searchChannel(){

  //}
  channelListArray: any = [];
  displayChannelList() {
    console.log("abcd")
    this.service.displayChannel().subscribe(reserve => {
      this.channelListArray = reserve.channels;
      console.log(this.channelListArray);
    },
      err => {
        console.log(err);
      }
    )
  }
  searchChannelArray: any = [];
  channel: string = "";
  lengthArray;
  channelFound = "";
  channelIdFound = "";
  searchChannel() {
    this.service.searchChannelService().subscribe(reserve => {
      for (let index = 0; index < reserve.channels.length; index++) {
        this.searchChannelArray.push(reserve.channels[index].unique_name);
        this.lengthArray = this.searchChannelArray.length;
        for (let index = 0; index < this.lengthArray; index++) {
          console.log(this.lengthArray);
          if (this.searchChannelArray[index] == this.isChannelFound) {
            this.channelFound = this.isChannelFound;
            this.channelIdFound = reserve.channels[index].sid;
            console.log(this.channelFound);
            console.log(this.channelIdFound);
            break;
          }
          else {

            this.channelFound = "Channel Not Found";
            console.log("Channel Not Found");
          }
        }
      }
    },
      err => {
        console.log();
      })
  }
  joinChannel() {
    console.log("abc")
    this.service.joinChannelService(this.channelIdFound).subscribe(reserve => {
      console.log(reserve);
    },
      err => {
        console.log(err);
      })
  }

  location;
  sendMsg() {
    this.service.sendMsgService(this.textmessage, this.location).subscribe(reserve => {
      console.log(reserve);
      this.getAllMsg(this.location);
    },
      err => {
        console.log(err);
      })
  }

  msgCounting;
  getAllMsg(location) {

    this.location = location;
    this.service.getAllMsgService(location).subscribe(reserve => {
      this.groupMsg = reserve.messages;
      this.msgCounting = reserve.messages.length;
      console.log("total" + this.msgCounting);
      for (let index = 0; index < this.msgCounting; index++) {
        this.groupMsg[index] = reserve.messages[index].body;
      }

    }),
      err => {
        console.log(err);
      }
  }
  logout(){
    localStorage.clear();
    this.routes.navigate(['/home']);
  }
  ngOnInit() {
    this.displayChannelList();
    
  }
}

  // initialMessage(){
  //   this.service.messageenter(this.textmessage).subscribe(reserve =>{
  //     this.groupMsg=reserve.body;
  //     },
  //   err =>{
  //     console.log(err);
  //   }
  //   )
  //   }  

