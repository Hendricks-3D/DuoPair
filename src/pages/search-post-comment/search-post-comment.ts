import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Comment } from './../../Interfaces/comment';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database-deprecated';
import { User } from '../../Interfaces/user';
/**
 * Generated class for the SearchPostCommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-post-comment',
  templateUrl: 'search-post-comment.html',
})
export class SearchPostCommentPage {

  private user = {} as User;
  private currentUser ={} as User;
  private comment = {} as Comment;
  private userPath='userProfile';
  private commentRef$: FirebaseListObservable<Comment[]>;
  private postId: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afDatabase: AngularFireDatabase,
  private afAuth: AngularFireAuth) {
  
  

        //GET POST ID THAT WAS PASSED FROM THE Prevous page
        this.user = this.navParams.data;


    //GET A REFERENCE TO THE COMMENTS
    this.commentRef$ = this.afDatabase.list(`${this.userPath}/${this.user.key}/post/${this.user.postId}/comments`);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostCommentsPage');
  }

  /**
   * Method that allow users to comment on post
   * 
   **/
  public makeComment(): void{
    this.GetCurrentUserData();
    this.comment.firstName = this.currentUser.firstName;
    this.comment.lastName = this.currentUser.lastName;
    this.comment.timeStamp = new Date().toDateString();
    this.comment.imageUrl = this.currentUser.imageUrl;
    
    
    this.afDatabase.list(`${this.userPath}/${this.user.key}/post/${this.user.postId}/comments`).push(this.comment).then((promise)=>{

      this.comment.key = promise.key;

      this.afDatabase.object(`${this.userPath}/${this.user.key}/post/${this.user.postId}/comments/${this.comment.key}`).update({
        id: this.comment.key})
    }).then(()=>{
      this.comment.commentText = "";
    })
  }


    /**
   * This method gets the current user data from firebase and return it as 
   * User type.
   */
  public GetCurrentUserData(): void {
    this.currentUser.key = this.afAuth.auth.currentUser.uid;
    //GET THE CURRENT USER DATA FROM THE DATABASE 
    this.afDatabase.object(`${this.userPath}/${this.currentUser.key}`).subscribe(userData=>{
      this.currentUser = userData;
  
    });

  }


}
