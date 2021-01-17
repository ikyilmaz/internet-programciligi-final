import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase} from '@angular/fire/database';
import {AuthService} from '../services/auth.service';
import {CustomUser} from '../models/custom-user';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private readonly angularFireAuth: AngularFireAuth,
    private readonly authService: AuthService,
    private readonly db: AngularFireDatabase,
    private readonly router: Router,
  ) {

  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot,) {
    const customUser = JSON.parse(localStorage.getItem('user')) as CustomUser;

    if (customUser.profile.role === 'admin') {
      return true;
    }

    await this.router.navigate(['']);
    return false;
  }

}
