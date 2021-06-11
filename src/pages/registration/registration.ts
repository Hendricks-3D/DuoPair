import { UploadPhotoPage } from './../upload-photo/upload-photo';
/*
Programmer: Odain Brown
Date: May 4, 2018
Page Function: Registration Page validates user data then register them.
*/


import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { User } from '../../Interfaces/user';
import { AngularFireAuth } from 'angularfire2/auth';




@IonicPage()
@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
})
export class RegistrationPage {

   user = {} as User;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afDatabase: AngularFireDatabase, 
    private afAuth: AngularFireAuth, private alertCtrl: AlertController) {
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrationPage');
  }

  public createAccount(): void{
      this.afAuth.auth.createUserWithEmailAndPassword(this.user.email,this.user.password).then(()=>{

        this.afAuth.authState.subscribe((auth) =>{
          this.user.key = auth.uid;


          this.afDatabase.object(`userProfile/${this.user.key}`).set(this.user).then((result) =>{

             this.navCtrl.setRoot(UploadPhotoPage,this.user.key);//NAVIGATE TO LOGIN page

          }).catch((err) => {

            let alert = this.alertCtrl.create({
              message:err,
              buttons:['Ok']
            })
            
            alert.present();

          });// close afDatabase catch promise


        })
      }).catch((err)=>{

        let alert = this.alertCtrl.create({
          message:err,
          buttons:['Ok']
        })
        
        alert.present();

      });
    
  } // END OF CREATE ACCOUNT METHOD


}//END OF REGISTRATIONPAGE CLASS
