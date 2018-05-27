import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth.service';
import { User } from '../../models/user.interface';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
private user: User[];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public authService: AuthService
    ) {
  }
  // ionViewCanEnter() {
  //   this.authService.getAuthenticateduser().subscribe(user=>{
  //     if(user) {
  //       this.navCtrl.setRoot('HomePage');
  //     }
  //   });
  // }

  ongoogleLogin() {
    this.authService.googleLogin();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
