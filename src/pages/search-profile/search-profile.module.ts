import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchProfilePage } from './search-profile';

@NgModule({
  declarations: [
    SearchProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(SearchProfilePage),
  ],
})
export class SearchProfilePageModule {}
