import {Component, Input, OnInit} from '@angular/core';
import {Result} from '../../models/result';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AnswerService} from '../../services/answer.service';
import {Answer} from '../../models/answer';

@Component({
  selector: 'app-update-answer-modal',
  templateUrl: './update-answer-modal.component.html'
})
export class UpdateAnswerModalComponent implements OnInit {
  @Input() answer: Answer = new Answer();
  result: Result = new Result();

  constructor(public readonly activeModal: NgbActiveModal, private readonly answerService: AnswerService) {
  }

  ngOnInit(): void {

  }

  async updateAnswer() {
    await this.answerService.updateAnswer(this.answer);
    await this.result.showSuccessAlert('Başarıyla güncellendi');
    this.activeModal.close();
  }
}
