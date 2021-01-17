import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Result} from '../../models/result';
import {Question} from '../../models/question';
import {QuestionService} from '../../services/question.service';
import {Observable} from 'rxjs';
import {Category} from '../../models/category';
import {CategoryService} from '../../services/category.service';

@Component({
  selector: 'app-update-question-modal',
  templateUrl: './update-question-modal.component.html'
})
export class UpdateQuestionModalComponent implements OnInit {
  @Input() question: Question = new Question();
  categories: Observable<Category[]>;
  result: Result = new Result();

  constructor(
    public readonly activeModal: NgbActiveModal,
    private readonly questionService: QuestionService,
    private readonly categoryService: CategoryService
  ) {
  }

  ngOnInit(): void {
    this.categories = this.categoryService.listCategories();
  }

  async updateQuestion() {
    await this.questionService.updateQuestion(this.question);
    await this.result.showSuccessAlert('Başarıyla güncellendi');
    this.activeModal.close();
  }

}
