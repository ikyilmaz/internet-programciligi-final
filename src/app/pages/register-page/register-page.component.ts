import {Component, OnInit} from '@angular/core';
import {Result} from '../../models/result';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {faGooglePlus} from '@fortawesome/free-brands-svg-icons';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {messages} from '../../shared/messages';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html'
})
export class RegisterPageComponent implements OnInit {
  faGooglePlus = faGooglePlus;
  messages = messages;

  public registerForm: FormGroup;

  public result: Result = new Result();

  get firstName(): AbstractControl {
    return this.registerForm.get('firstName');
  }

  get lastName(): AbstractControl {
    return this.registerForm.get('lastName');
  }

  get email(): AbstractControl {
    return this.registerForm.get('email');
  }

  get password(): AbstractControl {
    return this.registerForm.get('password');
  }

  constructor(private readonly authService: AuthService, private readonly router: Router) {

  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(32)
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(32)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(32)
      ])
    });
  }

  // Kayıt Ol
  async register(): Promise<void> {
    try {
      // Giriş Yap ve kullanıcıyı al
      const {user: {displayName}} = await this.authService.register(
        this.firstName.value,
        this.lastName.value,
        this.email.value,
        this.password.value
      );

      // Mesaj göster
      await this.result.showSuccessAlert(displayName ? `Hoşgeldiniz ${displayName}` : 'Başarılı bir şekilde giriş yapıldı');

      // Redirect
      await this.router.navigate(['']);
    } catch {
      this.result.showErrorAlert('Böyle bir kullanıcı zaten kayıtlı').then();
    }
  }

  // Gmail ile giriş yap
  async loginWithGmail(): Promise<void> {
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
