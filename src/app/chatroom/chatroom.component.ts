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
      console.log(len);
      let index;
      for (index; index < len; index++) {
        this.channelListArray[index] = reserve.channel[index].unique_name;
        console.log(this.channelListArray);
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
      console.log(reserve);

    });
    err => {
      console.log(err);
    }
  }
  messageList = [];
  messageListArray() {
    this.service.showallMessages().subscribe(reserve => {
      console.log(reserve.messages.length);
      length = reserve.messages.length;
      let index;
      for (index; index < length; index++) {
        this.messageListArray[index] = reserve.messages[index].body;
      }

    },
      err => {
        console.log(err);
      });
  }



}
