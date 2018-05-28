import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth.service';
// import { User } from '../../models/user.interface';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

// private user: User[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public authService: AuthService
    ) {
      console.log('ionViewDidLoad LoginPage..1 step');
    }

  ionViewCanEnter() {
    this.authService.getAuthenticateduser().subscribe(user=>{
      if(user) {
        this.navCtrl.setRoot('HomePage');
      }
    });
  }

  ongoogleLogin() {
    this.authService.googleLogin();
    this.navCtrl.setRoot('HomePage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
