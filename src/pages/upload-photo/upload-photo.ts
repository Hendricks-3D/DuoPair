import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController,ToastController } from 'ionic-angular';
import { User } from '../../Interfaces/user';

import { FileChooser } from '@ionic-native/file-chooser';
import {File }from '@ionic-native/file';
import {FilePath} from '@ionic-native/file-path';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import * as firebase from 'firebase';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-upload-photo',
  templateUrl: 'upload-photo.html',
})
export class UploadPhotoPage {

  imagePath : any = 'assets/imgs/noUser.png' as any;
   buffer: any;
   imageName:string;

  user = {} as User;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private file:File, private fileChooser:FileChooser, private filePath:FilePath,private toastCtrl:ToastController,
    private alert: AlertController,  private afDatabase: AngularFireDatabase,private loadingCtrl: LoadingController) 
  { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadPhotoPage');
    this.user.key = this.navParams.data;
  }

  public choosePhoto(): void{
    this.fileChooser.open().then((uri) => {

      /*The resolveLocalFilesystemUrl() method takes the uri and return a URL that can be used to locate the 
      file on the device as a JSON Object with methods*/
      this.filePath.resolveNativePath(uri).then((newUrl)=>{
      
       this.imagePath = newUrl;//DISPLAY THE IMAGE 
        


        let dirPathSegments = newUrl.split('/'); //Break string into an array photos /  movie  / kara.jpg
       let ImageName = dirPathSegments.pop();//REMOVE THE LAST ELEMENT: only kara.jpg will be stored 
       
       newUrl = newUrl.replace(ImageName,'');
       ImageName = ImageName.split('?')[0];  // --> This Line is added to make it work in case of Image...

       alert(JSON.stringify(newUrl));
      
        this.file.readAsArrayBuffer(newUrl,ImageName).then((buffer)=>{


           this.buffer = buffer;
           this.imageName = ImageName;
        })
      })
  
    }).catch((err)=>{

      let alert = this.alert.create({
        message:err,
        buttons:['ok']
      })

      alert.present();

    })
  }//END OF CHOOSE PHOTO



  public UploadPhotoToFirebase(){//UP LOAD THE FILE TO FIREBASE

    //Blob is a type of data structure use to transfer data
      let blob = new Blob([this.buffer],{type: "image/jpeg"});

    
      let storageRef = firebase.storage().ref().child('images/userProfilePhoto/' +this.GenerateUid() +this.imageName);
    
      //THE VARIABLE uploadTask WILL BE USED TO TELL WHEN THE FILE HAS UPLOAD
      const uploadTask: firebase.storage.UploadTask = storageRef.put(blob);//PUT THE FILE IMAGE IN  FIREBASE STORE
     
      
        let loader = this.loadingCtrl.create({
          content: "Please wait..."
        });
        loader.present();
      
      //GET THE IMAGE URL FROM FIREBASE STORAGE
      uploadTask.then((uploadSnapshot: firebase.storage.UploadTaskSnapshot)=>{
     

        this.user.imageUrl = uploadSnapshot.downloadURL;//Save the user profile pic download url for late use
        this.imagePath = this.user.imageUrl;
        
          //SET  TO DEFAULT IMAGE IF IMAGE IS NOT SELECTED
        if(this.IsEmpty(this.user.imageUrl))
        {
          this.user.imageUrl ='assets/imgs/noUser.png';
        }

        //UPDATE THE USER URL NAME THEN NAVIGATE TO LOGIN PAGE 
        this.afDatabase.object(`userProfile/${this.user.key}`).update({
            imageUrl: this.user.imageUrl
          }).then((promise)=>{

            loader.dismiss();
              this.navCtrl.setRoot(LoginPage);

          }).catch((err)=>{
            alert(err);
          });
      

      
      
      }).catch((err)=>{
        let toast = this.toastCtrl.create({
          message:err,
          duration:5000,
          position:'bottom',
        });

        toast.present();
      })
    }



    //CHECK IS VARIABLE IS EMPTY
    public IsEmpty(data: any): boolean {
        if(data==undefined ||data==""||data=='')
        {
          return true
        }
        else{
          return false;
        }
        
      
    }


    public GenerateUid(): string  {
      let d = new Date().getTime();
     let uuid:string = 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
      });
      return uuid;
    }



    
}//END OF UPLOADPHOTOPAGE 
