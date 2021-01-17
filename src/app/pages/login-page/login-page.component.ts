import {Component, OnInit} from '@angular/core';
import {faGooglePlus} from '@fortawesome/free-brands-svg-icons';
import {AuthService} from '../../services/auth.service';
import {Result} from '../../models/result';
import {Router} from '@angular/router';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {messages} from '../../shared/messages';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html'
})
export class LoginPageComponent implements OnInit {
  faGooglePlus = faGooglePlus;
  messages = messages;

  public loginForm: FormGroup;
  public result: Result = new Result();

  get email(): AbstractControl {
    return this.loginForm.get('email');
  }

  get password(): AbstractControl {
    return this.loginForm.get('password');
  }

  constructor(private readonly authService: AuthService, private readonly router: Router) {

  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('', [
        Validators.required,
      ])
    });
  }

  // Giriş yap
  async login(): Promise<void> {
    try {
      // Giriş Yap ve kullanıcıyı al
      const {user: {displayName}} = await this.authService.login(this.email.value, this.password.value);

      // Mesaj göster
      await this.result.showSuccessAlert(displayName ? `Hoşgeldiniz ${displayName}` : 'Başarılı bir şekilde giriş yapıldı');

      // Redirect
      await this.router.navigate(['']);
    } catch {
      this.result.showErrorAlert('E-Posta adresi ya da parola geçersiz')
    }
  }

  // Gmail ile giriş yap
  async loginWithGmail(): Promise<void> {
    console.log('loginWithGmail is working right now')
    try {
      // Giriş Yap ve kullanıcıyı al
      const {user: {displayName}} = await this.authService.loginWithGmail();

      // Mesaj göster
      await this.result.showSuccessAlert(displayName ? `Hoşgeldiniz ${displayName}` : 'Başarılı bir şekilde giriş yapıldı');

      // Redirect
      await this.router.navigate(['']);
    } catch {
      // Mesaj göster
      this.result.showErrorAlert('Bir şeyler ters gitti').then();
    }
  }

}
