import { TabsPage } from './../tabs/tabs';
import { User } from './../../Interfaces/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { RegistrationPage } from '../registration/registration';

/*
Programmer: Odain Brown
Date: May 4, 2018
Page Function: Login Page deals with user authentication then login after successfull authentication.
*/

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;
  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth,
              private toastCtrl: ToastController) {
                
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    
  }

  
  public Login(): void {

    this.afAuth.auth.signInWithEmailAndPassword(this.user.email, this.user.password).then((result) =>{

      this.navCtrl.setRoot(TabsPage);//NAVIGATE TO TABS PAGE 

    }).catch((err) =>{

      //CREATE TOAST FOR ERROR MESSAGE 
     this.toastCtrl.create({
        message:err,
        duration:5000,
        position: 'bottom',
      }).present();

      
    });


  }// END OF LOGIN FUNCTION

  public Register(): void {
    this.navCtrl.push(RegistrationPage);
  }

}//END OF LOGINPAGE CLASS
