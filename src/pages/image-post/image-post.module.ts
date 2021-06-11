import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImagePostPage } from './image-post';

@NgModule({
  declarations: [
    ImagePostPage,
  ],
  imports: [
    IonicPageModule.forChild(ImagePostPage),
  ],
})
export class ImagePostPageModule {}
