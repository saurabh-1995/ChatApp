import { Injectable } from '@angular/core';
import { Observable } from '../../node_modules/rxjs';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { map } from "rxjs/operators";



@Injectable({
  providedIn: 'root'
})
export class ApiCallService {
  url: string = "https://chat.twilio.com/v2/Services"

  channel: string = "https://chat.twilio.com/v2/Services/IS7332fd46852849abb0170fa90362dbc4/Channels"
  idservice: string = "IS7332fd46852849abb0170fa90362dbc4"
  idchannel: string = "CH489ea084b28d45b8b5560c58e96c2099"

  message: string = "https://chat.twilio.com/v2/Services/IS7332fd46852849abb0170fa90362dbc4/Channels/CH489ea084b28d45b8b5560c58e96c2099"
  constructor(private http: HttpClient) { }
  getData(): Observable<any> {
    const body = new HttpParams().set('FriendlyName', 'LatestChat');
    return this.http.post(this.url, body.toString(), httpOptions);
  }
  createChannel(mynewchannel): Observable<any> {
    return this.http.post(this.channel, 'UniqueName=' + mynewchannel, httpOptions);
  }
  displayChannel(): Observable<any> {
    return this.http.get(this.channel, httpOptions).pipe(map(data => data));
  }
  messageenter(myMessages): Observable<any> {
    return this.http.post("https://chat.twilio.com/v2/Services/" + this.idservice + "/Channels/" + this.idchannel + "/Messages", "ChannelSid="
      + this.idchannel + "&ServiceSid=" + this.idservice + "&Body=" + myMessages, httpOptions);
    //console.log(myMessages);
  }
  showallMessages(): Observable<any> {
    return this.http.get(this.message, httpOptions).pipe(map(data => data));
  }



}
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic QUMwYjNlNWQ2ZWQxYTY5MDJhNzMyZTVhNDczMWI4YWQ0Mjo5OWY3OGMwMDcxZDRjNDA1NmFjMjE3NjBmNGJmNWYzZA=='
  })
};
