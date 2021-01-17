import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from 'src/app/services/auth.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CreateQuestionModalComponent} from '../../components/create-question-modal/create-question-modal.component';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
})
export class UserLayoutComponent {
  constructor(public readonly authService: AuthService, public readonly router: Router, private readonly modalService: NgbModal) {

  }

  async logout() {
    await this.authService.logout();
    await this.router.navigate(['/']);
  }

  openModal() {
    this.modalService.open(CreateQuestionModalComponent);
  }
}
