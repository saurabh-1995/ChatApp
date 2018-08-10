import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../api-call.service';


@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit {

  constructor(private service: ApiCallService) { }
  public chatChannels = "";
  public textmessage = "";
  groupObject;
  groupMsg;

  ngOnInit() {
    this.displayChannelList();
  }


  mainChannel() {
    this.service.createChannel(this.chatChannels).subscribe(reserve => {
      console.log(reserve);
      this.groupObject = reserve.unique_name;
    },
      err => {
        console.log(err);
      }
    );
  }
  channelListArray = [];
  displayChannelList() {
    this.service.displayChannel().subscribe(reserve => {
      var len = reserve.channels.length;
      for (let index = 0; index < len; index++) {
        
        this.channelListArray[index] = reserve.channels[index].unique_name;
      }
    },
      err => {
        console.log(err);
      }
    )
  }
  initialMessage() {
    this.service.messageenter(this.textmessage).subscribe(reserve => {
      this.groupMsg = reserve.body;
      //console.log(reserve.body);

    });
    err => {
      console.log(err);
    }
  }
  messageList = [];
  messageListArray() {
    this.service.showallMessages().subscribe(reserve => {
      var len = reserve.message.length;
      

      let index;
      for (let index = 0; index < reserve.message.length; index++) {
        
        this.messageList[index] = reserve.message[index].body;
        console.log(index);
      }

    },
      err => {
        console.log(err);
      });
  }



}
