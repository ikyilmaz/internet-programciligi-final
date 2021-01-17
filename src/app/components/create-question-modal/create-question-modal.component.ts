import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Question} from '../../models/question';
import {QuestionService} from '../../services/question.service';
import {Result} from '../../models/result';
import {Observable} from 'rxjs';
import {Category} from '../../models/category';
import {CategoryService} from '../../services/category.service';

@Component({
  selector: 'app-create-question-modal',
  templateUrl: './create-question-modal.component.html'
})
export class CreateQuestionModalComponent implements OnInit {
  question: Question = new Question();
  categories: Observable<Category[]>;
  result: Result = new Result();

  constructor(
    public activeModal: NgbActiveModal,
    private readonly questionService: QuestionService,
    private readonly categoryService: CategoryService
  ) {
  }

  ngOnInit() {
    this.categories = this.categoryService.listCategories();
  }

  async createQuestion() {
    const question = await this.questionService.createQuestion(this.question);
    console.log(question);

    await this.result.showSuccessAlert('Başarıyla yeni soru oluşturuldu');

    this.activeModal.close();
  }

}
