import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  
} from "angular-6-social-login";
import { RouterModule,Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { ApiCallService } from './api-call.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule} from '@angular/forms';

const routes : Routes = [
  {
    path:'chatRoom',
    component:ChatroomComponent
  },
  {
    path:'home',
    component:SignInComponent
  },
  {
    path: '',
    component:SignInComponent
  }
];
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("709545970309-j083m2a221md9mtce955cn6ap1pqoo53.apps.googleusercontent.com")
        },
        
      ]
  );
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    ChatroomComponent
  ],
  imports: [
    BrowserModule,
    SocialLoginModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [ApiCallService,
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
