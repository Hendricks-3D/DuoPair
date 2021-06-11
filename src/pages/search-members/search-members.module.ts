import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchMembersPage } from './search-members';

@NgModule({
  declarations: [
    SearchMembersPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchMembersPage),
  ],
})
export class SearchMembersPageModule {}
