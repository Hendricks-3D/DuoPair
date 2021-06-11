import { AngularFireAuth } from 'angularfire2/auth';
import { ProfilePage } from './../profile/profile';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { Post } from '../../Interfaces/Post';


import { FileChooser } from '@ionic-native/file-chooser';
import {File }from '@ionic-native/file';
import {FilePath} from '@ionic-native/file-path';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import * as firebase from 'firebase';
import { User } from '../../Interfaces/user';

/**
 * Generated class for the ImagePostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-image-post',
  templateUrl: 'image-post.html',
})
export class ImagePostPage {

  private post: Post = {} as Post;
  private buffer: any;
  private imageName:string;
  private userID:string;
  private userPath='userProfile';
  private buffer2: any;
  private imageName2:string;
  private user ={} as User;

  private image1Url: string;
  private image2Url: string;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private file:File, private fileChooser:FileChooser, private filePath:FilePath,private toastCtrl:ToastController,
     private afDatabase: AngularFireDatabase,private loadingCtrl: LoadingController, private alertCtrl: AlertController,
    private afAuth:AngularFireAuth) {
    this.image1Url = 'assets/imgs/addImageBtn.png';
    this.image2Url ='assets/imgs/addImageBtn.png';
    //ASSIGNING
    this.post.postType = this.navParams.data;//GET POST TYPE]
    this.userID = this.afAuth.auth.currentUser.uid;
    this.GetCurrentUserData();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImagePostPage');
  }



  public MakePost(){
   
    this.post.userFirstName = this.user.firstName;
    this.post.userLastName = this.user.lastName;
    this.post.timeStamp = new Date().toDateString();

    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();

    this.UploadPhotoToFirebase();
    this.UploadPhotoToFirebase2();

    if(this.IsEmpty(this.post.image1Url) ||this.IsEmpty(this.post.image2Url))
    {
      let toast = this.toastCtrl.create({
            message:'Select a pair of image.',
            duration:3000,
            position:'bottom',
          });
  
          toast.present();

          loader.dismiss();

    }
    else
    {

  
      
        //PUSH POST TO FIREBASE INORDER TO GET uid
        this.afDatabase.list(`${this.userPath}/${this.userID}/post/`).push(this.post).then((promise)=>{

          //GET UID
          this.post.id = promise.key;
          alert(this.post.id);
          //UPDATE THE NODE AND ADD UID
         
           
            this.afDatabase.object(`${this.userPath}/${this.userID}/post/${this.post.id}`).update({
              id: this.post.id}).then((promise)=>{
                
                loader.dismiss(); 
                this.navCtrl.setRoot(ProfilePage);
      
              })
           
      });
    }

  }




//-----------------------------------UPLOAD IMAGE 1 TO FIREBASE-----------------------------


  public choosePhoto(): void{
    this.fileChooser.open().then((uri) => {

      /*The resolveLocalFilesystemUrl() method takes the uri and return a URL that can be used to locate the 
      file on the device as a JSON Object with methods*/
      this.filePath.resolveNativePath(uri).then((newUrl)=>{
      
       this.image1Url = newUrl;//DISPLAY THE IMAGE 
        


        let dirPathSegments = newUrl.split('/'); //Break string into an array photos /  movie  / kara.jpg
       let ImageName = dirPathSegments.pop();//REMOVE THE LAST ELEMENT: only kara.jpg will be stored 
       
       newUrl = newUrl.replace(ImageName,'');
       ImageName = ImageName.split('?')[0];  // --> This Line is added to make it work in case of Image...

        this.file.readAsArrayBuffer(newUrl,ImageName).then((buffer)=>{
           this.buffer = buffer;
           this.imageName = ImageName;
        })
      })
  
    }).catch((err)=>{

      let alert = this.alertCtrl.create({
        message:err,
        buttons:['ok']
      })

      alert.present();

    })
  }//END OF CHOOSE PHOTO


  public UploadPhotoToFirebase(){//UP LOAD THE FILE TO FIREBASE

    //Blob is a type of data structure use to transfer data
      let blob = new Blob([this.buffer],{type: "image/jpeg"});   
      let storageRef = firebase.storage().ref().child('images/post/' +this.GenerateUid()+this.imageName);
    
      //THE VARIABLE uploadTask WILL BE USED TO TELL WHEN THE FILE HAS UPLOAD
      const uploadTask: firebase.storage.UploadTask = storageRef.put(blob);//PUT THE FILE IMAGE IN  FIREBASE STORE
      //GET THE IMAGE URL FROM FIREBASE STORAGE
      uploadTask.then((uploadSnapshot: firebase.storage.UploadTaskSnapshot)=>{
     

        this.post.image1Url = uploadSnapshot.downloadURL;//Save the user profile pic download url for late use
        

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


    
//-----------------------------------UPLOAD IMAGE 2 TO FIREBASE-----------------------------


public choosePhoto2(): void{
  this.fileChooser.open().then((uri) => {

    /*The resolveLocalFilesystemUrl() method takes the uri and return a URL that can be used to locate the 
    file on the device as a JSON Object with methods*/
    this.filePath.resolveNativePath(uri).then((newUrl)=>{
    
     this.image2Url = newUrl;//DISPLAY THE IMAGE 
      


      let dirPathSegments = newUrl.split('/'); //Break string into an array photos /  movie  / kara.jpg
     let ImageName = dirPathSegments.pop();//REMOVE THE LAST ELEMENT: only kara.jpg will be stored 
     
     newUrl = newUrl.replace(ImageName,'');
     ImageName = ImageName.split('?')[0];  // --> This Line is added to make it work in case of Image...

      this.file.readAsArrayBuffer(newUrl,ImageName).then((buffer)=>{


         this.buffer2 = buffer;
         this.imageName2 = ImageName;
      })
    })

  }).catch((err)=>{

    let alert = this.alertCtrl.create({
      message:err,
      buttons:['ok']
    })

    alert.present();

  })
}//END OF CHOOSE PHOTO


public UploadPhotoToFirebase2(){//UP LOAD THE FILE TO FIREBASE

  //Blob is a type of data structure use to transfer data
    let blob = new Blob([this.buffer2],{type: "image/jpeg"});
    let storageRef = firebase.storage().ref().child('images/post/' +this.GenerateUid()+this.imageName2);
  
    //THE VARIABLE uploadTask WILL BE USED TO TELL WHEN THE FILE HAS UPLOAD
    const uploadTask: firebase.storage.UploadTask = storageRef.put(blob);//PUT THE FILE IMAGE IN  FIREBASE STORE
   
    //GET THE IMAGE URL FROM FIREBASE STORAGE
    uploadTask.then((uploadSnapshot: firebase.storage.UploadTaskSnapshot)=>{
   

      this.post.image2Url = uploadSnapshot.downloadURL;//Save the user profile pic download url for late use

    }).catch((err)=>{
      let toast = this.toastCtrl.create({
        message:err,
        duration:5000,
        position:'bottom',
      });

      toast.present();
    })
  }


  public GetCurrentUserData(): void {

    //GET THE CURRENT USER DATA FROM THE DATABASE 
    this.afDatabase.object(`${this.userPath}/${this.userID}`).subscribe(userData=>{
      this.user = userData;
  
    });

    
  }//END OF GET CURRENT USER DATA 

}//END OF IMAGE POST PAGE
