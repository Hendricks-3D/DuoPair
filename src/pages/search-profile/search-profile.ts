import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../Interfaces/user';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database-deprecated';
import { Post } from '../../Interfaces/Post';
import { SearchPostCommentPage } from '../search-post-comment/search-post-comment';

/**
 * Generated class for the SearchProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-profile',
  templateUrl: 'search-profile.html',
})
export class SearchProfilePage {

  private user = {} as User;
  private userId: string;
  private userPath='userProfile';
  private followerPath = 'follower';
  private postRef$: FirebaseListObservable<Post[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afDatabase: AngularFireDatabase) {

      this.user = this.navParams.data;

        //GET THE CURRENT USER POSTS 
    this.postRef$ = this.afDatabase.list(`${this.userPath}/${this.user.key}/post`);
    console.log("User Data: "+ this.user);
    
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



  public OpenPostCommentsPage(id): void {
    this.user.postId = id;
    this.navCtrl.push(SearchPostCommentPage,this.user)

  }




}
