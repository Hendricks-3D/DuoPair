import { ImagePostPage } from './../image-post/image-post';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Post } from '../../Interfaces/Post';
import { TextPostPage } from '../text-post/text-post';

/*
Programmer: Odain Brown
Date: May 8, 2018
Page Function: Post Modal Page allow the user to select the type of post they want to do 
              Image or text and send user to the corresponding page.
*/

@IonicPage()
@Component({
  selector: 'page-post-modal',
  templateUrl: 'post-modal.html',
})
export class PostModalPage {

  private comparePost:Post  = {} as  Post;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostModalPage');
  }
 //NAVIGATE TO TEXT POST PAGE AND SEND POST TYP
  public GoToTextPostPage(): void {
      this.comparePost.postType ='text';
      this.navCtrl.push(TextPostPage,this.comparePost.postType);
  }

  //NAVIGATE TO IMAGE POST PAGE AND SEND POST TYPE
  public GoToImagePostPage(): void {
      this.comparePost.postType = 'image';
      this.navCtrl.push(ImagePostPage,this.comparePost.postType);

  }


}// END OF POST MODAL PAGE 
