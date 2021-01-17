import {Component, Input, OnInit} from '@angular/core';
import {Question} from '../../models/question';
import {AnswerService} from '../../services/answer.service';
import {Answer} from '../../models/answer';
import {Result} from '../../models/result';
import {AngularFireAuth} from '@angular/fire/auth';
import {AuthService} from '../../services/auth.service';
import {QuestionService} from '../../services/question.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UpdateQuestionModalComponent} from '../update-question-modal/update-question-modal.component';
import {faEdit} from '@fortawesome/free-regular-svg-icons';
import {UpdateAnswerModalComponent} from '../update-answer-modal/update-answer-modal.component';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html'
})
export class QuestionCardComponent implements OnInit {
  @Input('question') question: Question;

  public faEdit = faEdit;

  public answer: Answer = new Answer();
  public result: Result = new Result();

  constructor(
    private readonly modalService: NgbModal,
    private readonly answerService: AnswerService,
    public readonly angularFireAuth: AngularFireAuth,
    public readonly authService: AuthService,
    private readonly questionService: QuestionService
  ) {
  }

  ngOnInit(): void {

  }

  async answerTheQuestion(questionId: string) {
    const answer = await this.answerService.createAnswer({questionId, ...this.answer});
    await this.result.showSuccessAlert('Başarıyla cevaplandı');
  }

  deleteQuestion(id: string) {
    if (confirm('Bu işlem geri alınamaz.\nEmin misiniz?')) {
      return this.questionService.deleteQuestion(id);
    }
  }

  deleteAnswer(id: string) {
    if (confirm('Bu işlem geri alınamaz.\nEmin misiniz?')) {
      return this.answerService.deleteAnswer(id);
    }
  }

  openUpdateQuestionModal(question: Question) {
    const modalRef = this.modalService.open(UpdateQuestionModalComponent);
    modalRef.componentInstance.question = {...question};
  }

  openUpdateAnswerModal(answer: Answer) {
    const modalRef = this.modalService.open(UpdateAnswerModalComponent);
    modalRef.componentInstance.answer = {...answer};
  }

}
