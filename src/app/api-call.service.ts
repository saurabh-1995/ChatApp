import { Injectable } from '@angular/core';
import { Observable } from '../../node_modules/rxjs';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { map } from "rxjs/operators";



@Injectable({
  providedIn: 'root'
})
export class ApiCallService {
  url: string = "https://chat.twilio.com/v2/Services"

  channel: string = "https://chat.twilio.com/v2/Services/IS8cded33916e544a19b99ab3675cfc1ec/Channels"
  idservice: string = "IS8cded33916e544a19b99ab3675cfc1ec"
  idchannel: string = "CH489ea084b28d45b8b5560c58e96c2099"
  identity: string = localStorage.getItem("Identity");
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic QUMwYjNlNWQ2ZWQxYTY5MDJhNzMyZTVhNDczMWI4YWQ0Mjo5OWY3OGMwMDcxZDRjNDA1NmFjMjE3NjBmNGJmNWYzZA=='
    })
  };

  constructor(private http: HttpClient) { }
  getData(): Observable<any> {
    const body = new HttpParams().set('FriendlyName', 'Chat');
    return this.http.post(this.url, body.toString(), this.httpOptions);
  }
  createChannelService(mynewchannel): Observable<any> {
    return this.http.post(this.channel, 'UniqueName=' + mynewchannel, this.httpOptions);
  }
  displayChannelService(): Observable<any> {
    return this.http.get(this.channel, this.httpOptions).pipe(map(data => data));
  }
  searchChannelService(): Observable<any> {
    return this.http.get(this.channel, this.httpOptions).pipe(map(data => data));
  }
  joinChannelService(channelId): Observable<any> {
    return this.http.post(this.channel + "/" + channelId + "/Members", "ChannelSid=" + channelId +
      "&Identity=" + this.identity + "&ServiceSid=" + this.idservice, this.httpOptions);
  }
  sendMsgService(textmessage, sendMsg): Observable<any> {
    return this.http.post(sendMsg,
      "ChannelSid=" + this.idchannel + "&ServiceSid=" + this.idservice + "&Body=" + textmessage + "&From=" + this.identity, this.httpOptions);
  }

  getAllMsgService(totalMsg): Observable<any> {
    return this.http.get(totalMsg, this.httpOptions).pipe(map(data => data));
  }


}


