import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TextPostPage } from './text-post';

@NgModule({
  declarations: [
    TextPostPage,
  ],
  imports: [
    IonicPageModule.forChild(TextPostPage),
  ],
})
export class TextPostPageModule {}
