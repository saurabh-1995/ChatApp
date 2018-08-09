import { Component, OnInit } from '@angular/core';
import {
  AuthService,
  GoogleLoginProvider,
      } 
  from 'angular-6-social-login';
import { Router } from '../../../node_modules/@angular/router';
import { ApiCallService } from '../api-call.service';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private socialAuthService: AuthService, private routes:Router, private service:ApiCallService) { }

  ngOnInit() {
  } 
    
    public socialSignIn(socialPlatform : string) {
     var socialPlatformProvider;
      
      if(socialPlatform == "google"){
        socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
        this.socialAuthService.signIn(socialPlatformProvider).then(
          (userData) => {
            var serve =this.service.getData();
            serve.subscribe(data => console.log(data));
            this.routes.navigate(['chatRoom']);
            
            //console.log(socialPlatform + " " , userData);
            // Now sign-in with userData
            // ...
          }
        );
      }
      // else if(socialPlatform == "twitter"){
      //   socialPlatformProvider = TwitterLoginProvider.PROVIDER_ID;
      //   this.socialAuthService.signIn(socialPlatformProvider).then(
      //     (userData) => {
      //       console.log(socialPlatform + " " , userData);
      //       // Now sign-in with userData
      //       // ...
      //     }
      //   );
      // }
      
    }
}
