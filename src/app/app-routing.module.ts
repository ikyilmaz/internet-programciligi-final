import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {MyProfilePageComponent} from './pages/my-profile-page/my-profile-page.component';
import {MyQuestionsPageComponent} from './pages/my-questions-page/my-questions-page.component';
import {RegisterPageComponent} from './pages/register-page/register-page.component';
import {AdminPageComponent} from './pages/admin-page/admin-page.component';
import {AdminGuard} from './guards/admin.guard';

/*
 * giriş yapmış ise anasayfaya gönder
 */
const redirectIfLoggedIn = () => redirectLoggedInTo(['']);

/*
 * giriş yapmamış ise giriş yap sayfasına gönder
 */
const redirectIfIsNotAuthorized = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'login',
    component: LoginPageComponent,
    ...canActivate(redirectIfLoggedIn),
  },
  {
    path: 'register',
    component: RegisterPageComponent,
    ...canActivate(redirectIfLoggedIn),
  },
  {
    path: 'my-questions',
    component: MyQuestionsPageComponent,
    ...canActivate(redirectIfIsNotAuthorized),
  },
  {
    path: 'my-profile',
    component: MyProfilePageComponent,
    ...canActivate(redirectIfIsNotAuthorized),
  },
  {
    path: 'admin',
    component: AdminPageComponent,
    canActivate: [AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
