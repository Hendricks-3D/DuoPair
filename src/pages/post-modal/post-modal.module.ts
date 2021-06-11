import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostModalPage } from './post-modal';

@NgModule({
  declarations: [
    PostModalPage,
  ],
  imports: [
    IonicPageModule.forChild(PostModalPage),
  ],
})
export class PostModalPageModule {}
