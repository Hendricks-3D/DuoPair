import { PostCommentsPage } from './../post-comments/post-comments';

import { PostModalPage } from './../post-modal/post-modal';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { User } from '../../Interfaces/user';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Post } from '../../Interfaces/Post';
import { OptionPage } from '../option/option';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  private user = {} as User;
  private userId: string;
  private userPath='userProfile';
  private followerPath = 'follower';
  private postRef$: FirebaseListObservable<Post[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private afAuth: AngularFireAuth,  private afDatabase: AngularFireDatabase) {
    this.userId = this.afAuth.auth.currentUser.uid;
 
        //GET THE CURRENT USER POSTS 
    this.postRef$ = this.afDatabase.list(`${this.userPath}/${this.userId}/post`);

    this.GetCurrentUserData();
    
    // CHECK IF USER HAS AN IMAGE 
    if(this.IsEmpty(this.user.imageUrl))
    {
      this.user.imageUrl = 'assets/imgs/noUser.png';
    }




  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
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


      }//END OF GET CURRENT USER DATA 
      
  
  /**
   * This method gets the current user data from firebase and return it as 
   * User type.
   */
  public GetCurrentUserData(): void {

    //GET THE CURRENT USER DATA FROM THE DATABASE 
    this.afDatabase.object(`${this.userPath}/${this.userId}`).subscribe(userData=>{
      this.user = userData;
  
    });

    
  }//END OF GET CURRENT USER DATA 



  public UpdateProfile(user = {} as User, userId: string): Promise<void> 
  {
    return this.afDatabase.object(`${this.userPath}/${userId}`).update(user);
  }


    /**
   * This method gets a list of all the user followers and return it 
   * as Firebase List Observable
   */

  public GetFollowers(userId: string): FirebaseListObservable<User[]> 
  {
      let followersRef$: FirebaseListObservable<User[]>;
 
      followersRef$ = this.afDatabase.list(`${this.userPath}/${userId}/${this.followerPath}`);
      return followersRef$;
  }//END OF GET FOLLOWERS


  public OpenOptionPage(): void {
    this.navCtrl.push(OptionPage)

  }
  public OpenPostCommentsPage(id:any): void {
    this.navCtrl.push(PostCommentsPage,id);

  }



}//END OF PROFILE PAGE CLASS
