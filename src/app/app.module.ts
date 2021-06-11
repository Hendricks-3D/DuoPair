import { SearchPostCommentPage } from './../pages/search-post-comment/search-post-comment';
import { SearchProfilePage } from './../pages/search-profile/search-profile';
import { PostCommentsPage } from './../pages/post-comments/post-comments';
import { TextPostPage } from './../pages/text-post/text-post';
import { ImagePostPage } from './../pages/image-post/image-post';
import { PostModalPage } from './../pages/post-modal/post-modal';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UploadPhotoPage } from './../pages/upload-photo/upload-photo';
import { RegistrationPage } from './../pages/registration/registration';
import { NotificationsPage } from './../pages/notifications/notifications';
import { LoginPage } from './../pages/login/login';
import { ProfilePage } from './../pages/profile/profile';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


//FIREBASE MODULES
import {AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';
import {AngularFireModule } from "angularfire2";
import { FilePath } from '@ionic-native/file-path';
import { FileChooser } from '@ionic-native/file-chooser';
import {File }from '@ionic-native/file';
import { OptionPage } from '../pages/option/option';
import { SearchMembersPage } from '../pages/search-members/search-members';


@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    AboutPage,
    HomePage,
    ProfilePage,
    LoginPage,
    RegistrationPage,
    UploadPhotoPage,
    NotificationsPage,
    PostModalPage,
    ImagePostPage,
    TextPostPage,
    OptionPage,
    PostCommentsPage,
    SearchMembersPage,
    SearchProfilePage,
    SearchPostCommentPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyDkox8Oi-FdIbKJyB7lzMCAPdEbIzRnpPI",
      authDomain: "duopair-ae2f6.firebaseapp.com",
      databaseURL: "https://duopair-ae2f6.firebaseio.com",
      projectId: "duopair-ae2f6",
      storageBucket: "duopair-ae2f6.appspot.com",
      messagingSenderId: "1082037467197"
    }),
    AngularFireAuthModule,
    AngularFireDatabaseModule, HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    AboutPage,
    HomePage,
    ProfilePage,
    LoginPage,
    RegistrationPage,
    UploadPhotoPage,
    NotificationsPage,
    PostModalPage,
    ImagePostPage,
    TextPostPage,
    OptionPage,
    PostCommentsPage,
    SearchMembersPage,
    SearchProfilePage,
    SearchPostCommentPage,
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AngularFireDatabaseModule,
    File,
    FileChooser,
    FilePath,
    HttpClient


  ]
})
export class AppModule {}
