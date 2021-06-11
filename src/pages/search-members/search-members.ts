import { SearchProfilePage } from './../search-profile/search-profile';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../Interfaces/user';

/**
 * Generated class for the SearchMembersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-members',
  templateUrl: 'search-members.html',
})
export class SearchMembersPage {

  searchQuery: string = '';
  membersRef: FirebaseListObservable<User[]>;
  members:User[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private afDatabse: AngularFireDatabase) {
    this.initializeMembers();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchMembersPage');
   
  }






  initializeMembers() {
    this.membersRef = this.afDatabse.list(`userProfile`);

    this.membersRef.forEach((element: User[]) => {
        this.members = element;
    });

  }

  getMembers(ev: any) {
    // Reset Members back to all of the Members
    this.initializeMembers();
    let userName:string;
    
    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the Members
    if (val && val.trim() != '') {
      this.members = this.members.filter((member) => {
        userName = member.firstName+member.lastName;
        return (userName.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }//END OF GET MEMBER



  OpenProfile(member={} as User): void{
    this.navCtrl.push(SearchProfilePage,member);
  }

}
