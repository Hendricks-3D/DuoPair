import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchPostCommentPage } from './search-post-comment';

@NgModule({
  declarations: [
    SearchPostCommentPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchPostCommentPage),
  ],
})
export class SearchPostCommentPageModule {}
