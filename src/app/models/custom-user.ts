import firebase from 'firebase/app';
import {UserProfile} from './user-profile';

export class CustomUser {
  constructor(public user: firebase.User, public profile: UserProfile) {

  }
}
