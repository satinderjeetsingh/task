import { Component, OnInit } from '@angular/core';
import { AuthService, SocialUser } from 'angular-6-social-login';
import { FacebookLoginProvider } from 'angular-6-social-login';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-fb',
  templateUrl : 'login-fb.html',
  styleUrls: ['login-fb.css']
})
export class LoginFbComponent implements OnInit {

  public user : SocialUser;
  public loggedIn : boolean;
  public returnUrl : string; 
public sub : any;

  constructor(public authService : AuthService, private route: ActivatedRoute, public _router : Router){}
  
  ngOnInit()
  {  
  this.returnUrl = this.route.snapshot.queryParams['returnUrl']||'/Timeline-Chart';
  }
  signInWithFB(){
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.authService.authState.subscribe((user)=>{
      this.user =  user;
      this.loggedIn = (user != null);
      if(this.user!=null){
      alert("Welcome "+ this.user.name);
      this._router.navigateByUrl(this.returnUrl);
    }
    else
    {
      alert("Enter Valid Facebook Credentials"); 
    }
  })

  }
  
}

