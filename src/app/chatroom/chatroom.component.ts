import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../api-call.service';


@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit {

  constructor(private service:ApiCallService) { }
  public myChat="";
  public textmessage ="";
  groupObject;
  groupMsg;

  ngOnInit() { this.displayChannelList();
  }
  

  myChannel(){
  this.service.createChannel(this.myChat).subscribe(reserve =>{
    console.log(reserve);
    console.log("channel created" );
    this.groupObject
  },
  err =>{
    console.log(err);
  }
  );
  }
  channelListArray= [];
  displayChannelList(){
    this.service.displayChannel().subscribe(reserve =>{
      var len=reserve.channels.length;
      console.log(len);
      for(let index = 0;index<len;index++)
      {
        this.channelListArray[index] = reserve.channel[index].unique_name;
        console.log(this.channelListArray);
      }
    }, 
    err =>{
      console.log(err);
    }
  )
  }
  myMessage(){
    this.service.messageenter(this.textmessage).subscribe(reserve =>{
      this.groupMsg=reserve.body;
      console.log(this.groupMsg);

    },
    err =>{
      console.log(err);
    }
    )

  }  


    
  }
