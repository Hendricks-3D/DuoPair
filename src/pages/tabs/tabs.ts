import { PostModalPage } from './../post-modal/post-modal';

import { Component } from '@angular/core';

import { ProfilePage } from '../profile/profile';
import { HomePage } from '../home/home';
import { NotificationsPage } from './../notifications/notifications';
import { SearchMembersPage } from '../search-members/search-members';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = NotificationsPage;
  tab3Root = PostModalPage
  tab5Root = ProfilePage;
  tab4Root = SearchMembersPage;

  constructor() {

  }
}
