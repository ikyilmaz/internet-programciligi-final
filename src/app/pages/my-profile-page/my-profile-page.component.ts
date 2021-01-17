import {Component, OnInit} from '@angular/core';
import {CustomUser} from '../../models/custom-user';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase} from '@angular/fire/database';
import {UserProfile} from '../../models/user-profile';
import {Result} from '../../models/result';

@Component({
  selector: 'app-my-profile-page',
  templateUrl: './my-profile-page.component.html'
})
export class MyProfilePageComponent implements OnInit {
  user: CustomUser = JSON.parse(localStorage.getItem('user'));

  profile = {firstName: this.user.profile.firstName.valueOf(), lastName: this.user.profile.lastName.valueOf()};

  password = {currentPassword: '', newPassword: ''};

  email: string = '';

  profileResult: Result = new Result();
  passwordResult: Result = new Result();
  emailResult: Result = new Result();

  constructor(private readonly angularFireAuth: AngularFireAuth, private readonly db: AngularFireDatabase) {
  }

  ngOnInit(): void {

  }

  async updateProfile() {
    try {
      const user = await this.angularFireAuth.currentUser;
      await user.updateProfile({displayName: `${this.profile.firstName} ${this.profile.lastName}`});
      await this.db.object<UserProfile>(`user_profiles/${this.user.profile.id}`).update(this.profile);
      await this.profileResult.showSuccessAlert('Başarılı');
    } catch {
      await this.profileResult.showErrorAlert('Başarısız');
    }
  }


  async changePassword() {
    try {
      const {user} = await this.angularFireAuth.signInWithEmailAndPassword(this.user.user.email, this.password.currentPassword);
      await user.updatePassword(this.password.newPassword);
      await this.passwordResult.showSuccessAlert('Başarılı');
    } catch {
      await this.passwordResult.showErrorAlert('Şifre doğru değil ya da girilen şifre çok kısa');
    }
  }
}
