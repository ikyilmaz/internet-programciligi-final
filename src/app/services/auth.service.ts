import {Injectable, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import firebase from 'firebase/app';
import {AngularFireDatabase} from '@angular/fire/database';
import {UserProfile} from '../models/user-profile';
import {CustomUser} from '../models/custom-user';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  isAuth = false;
  currentUser: CustomUser;

  constructor(
    private readonly angularFireAuth: AngularFireAuth,
    private readonly db: AngularFireDatabase
  ) {
    this.angularFireAuth.onAuthStateChanged((user) => {
      if (!user) {
        return (this.isAuth = false);
      }


      this.isAuth = true;
      this.db
        .list<UserProfile>('user_profiles', (ref) => ref.orderByChild('userId').equalTo(user.uid))
        .snapshotChanges()
        .subscribe((changes) => {
          const customUser = new CustomUser(user, {id: changes[0].key, ...changes[0].payload.val(),});
          localStorage.setItem('user', JSON.stringify(customUser));
          this.currentUser = customUser;
        });
    });
  }

  ngOnInit() {
    console.log(this.currentUser);
  }

  // Giriş Yapmak için
  async login(
    email: string,
    password: string
  ): Promise<CustomUser> {
    // Normal bir şekilde giriş yap
    const userCredentials = await this.angularFireAuth.signInWithEmailAndPassword(email, password);

    const userProfile = await new Promise<UserProfile>(resolve => {
      this.db
        .list<UserProfile>('user_profiles', (ref) =>
          ref.orderByChild('userId').equalTo(userCredentials.user.uid)
        )
        .snapshotChanges()
        .subscribe((changes) => {
          const userProfileChange = changes.shift();

          const queriedUserProfile = {
            id: userProfileChange.key,
            ...userProfileChange.payload.val(),
          };

          resolve(queriedUserProfile);
        });
    });

    const customUser = new CustomUser(userCredentials.user, userProfile);

    localStorage.setItem('user', JSON.stringify(customUser));
    return customUser;
  }

  // Gmail ile giriş yap
  async loginWithGmail(): Promise<CustomUser> {
    const userCredentials = await this.angularFireAuth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );

    const userProfile = await new Promise<UserProfile>(
      async (resolve) => {
        if (userCredentials.additionalUserInfo.isNewUser) {
          const displayNameArray = userCredentials.user.displayName.split(' ');

          const lastName = displayNameArray.pop();
          const firstName = displayNameArray
            .splice(displayNameArray.indexOf(lastName), 1)
            .join(' ');

          const createdUserProfile = await this.createProfile(
            firstName,
            lastName,
            userCredentials.user.uid
          );

          resolve(createdUserProfile);
        } else {
          this.db
            .list<UserProfile>('user_profiles', (ref) =>
              ref.orderByChild('userId').equalTo(userCredentials.user.uid)
            )
            .snapshotChanges()
            .subscribe((changes) => {
              const userProfileChange = changes.shift();

              const queriedUserProfile = {
                id: userProfileChange.key,
                ...userProfileChange.payload.val(),
              };

              resolve(queriedUserProfile);
            });
        }
      }
    );

    const customUser = new CustomUser(userCredentials.user, userProfile);

    localStorage.setItem('user', JSON.stringify(customUser));
    return customUser;
  }

  // Kayıt olmak için
  async register(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Promise<CustomUser> {
    // Kullanıcıyı oluştur
    const userCredentials = await this.angularFireAuth.createUserWithEmailAndPassword(
      email,
      password
    );

    const userProfile = await this.createProfile(
      firstName,
      lastName,
      userCredentials.user.uid
    );

    // Ardından profiline isim ve soyisim ekle
    await userCredentials.user.updateProfile({
      displayName: `${firstName} ${lastName}`,
    });

    const customUser = new CustomUser(userCredentials.user, userProfile);

    localStorage.setItem('user', JSON.stringify(customUser));
    return customUser;
  }

  // Çıkış yapmak için
  logout(): Promise<void> {
    // Çıkış yap
    return this.angularFireAuth.signOut();
  }

  private async createProfile(
    firstName: string,
    lastName: string,
    userId: string
  ): Promise<UserProfile> {
    const userProfileSnapshot = await this.db
      .list<UserProfile>('user_profiles')
      .push({firstName, lastName, userId, role: 'user'})
      .get();

    return {
      id: userProfileSnapshot.key,
      ...userProfileSnapshot.val(),
    };
  }
}
