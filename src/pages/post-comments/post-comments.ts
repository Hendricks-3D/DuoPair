import { AngularFireAuth } from 'angularfire2/auth';
import { Comment } from './../../Interfaces/comment';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../Interfaces/user';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database-deprecated';

/**
 * Generated class for the PostCommentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-post-comments',
  templateUrl: 'post-comments.html',
})
export class PostCommentsPage {

  private user = {} as User;
  private comment = {} as Comment;
  private userPath='userProfile';
  private commentRef$: FirebaseListObservable<Comment[]>;
  private postId: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afDatabase: AngularFireDatabase,
  private afAuth: AngularFireAuth) {
    this.user.key = this.afAuth.auth.currentUser.uid;
    this.GetCurrentUserData();

        //GET POST ID THAT WAS PASSED FROM THE Prevous page
        this.postId = this.navParams.data;


    //GET A REFERENCE TO THE COMMENTS
    this.commentRef$ = this.afDatabase.list(`${this.userPath}/${this.user.key}/post/${this.postId}/comments`);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostCommentsPage');
  }

  /**
   * Method that allow users to comment on post
   * 
   **/
  public makeComment(): void{

    this.comment.firstName = this.user.firstName;
    this.comment.lastName = this.user.lastName;
    this.comment.timeStamp = new Date().toDateString();
    this.comment.imageUrl = this.user.imageUrl;
    
    
    this.afDatabase.list(`${this.userPath}/${this.user.key}/post/${this.postId}/comments`).push(this.comment).then((promise)=>{

      this.comment.key = promise.key;

      this.afDatabase.object(`${this.userPath}/${this.user.key}/post/${this.postId}/comments/${this.comment.key}`).update({
        id: this.comment.key})
    })
  }

    /**
   * This method gets the current user data from firebase and return it as 
   * User type.
   */
  public GetCurrentUserData(): void {

    //GET THE CURRENT USER DATA FROM THE DATABASE 
    this.afDatabase.object(`${this.userPath}/${this.user.key}`).subscribe(userData=>{
      this.user = userData;
  
    });

    
  }//END OF GET CURRENT USER DATA 


}
