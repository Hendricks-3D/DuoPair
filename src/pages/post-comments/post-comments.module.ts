import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostCommentsPage } from './post-comments';

@NgModule({
  declarations: [
    PostCommentsPage,
  ],
  imports: [
    IonicPageModule.forChild(PostCommentsPage),
  ],
})
export class PostCommentsPageModule {}
