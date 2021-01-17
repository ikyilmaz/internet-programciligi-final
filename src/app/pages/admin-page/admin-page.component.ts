import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CreateCategoryModalComponent} from '../../components/create-category-modal/create-category-modal.component';
import {Observable} from 'rxjs';
import {Category} from '../../models/category';
import {CategoryService} from '../../services/category.service';
import {faEdit} from '@fortawesome/free-regular-svg-icons';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {UpdateCategoryModalComponent} from '../../components/update-category-modal/update-category-modal.component';
import {Question} from '../../models/question';
import {QuestionService} from '../../services/question.service';
import {UpdateQuestionModalComponent} from '../../components/update-question-modal/update-question-modal.component';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html'
})
export class AdminPageComponent implements OnInit {
  categories: Observable<Category[]>;
  questions: Observable<Question[]>;

  faEdit = faEdit;
  faTrash = faTrash;

  constructor(private readonly modalService: NgbModal, private readonly categoryService: CategoryService, private readonly questionService: QuestionService) {
  }

  ngOnInit(): void {
    this.categories = this.categoryService.listCategories();
    this.questions = this.questionService.listQuestions();
  }

  openModal() {
    this.modalService.open(CreateCategoryModalComponent);
  }

  deleteCategory(id: string) {
    if (confirm('Emin misiniz?')) {
      return this.categoryService.deleteCategory(id);
    }
  }

  updateCategory(category: Category) {
    const modalRef = this.modalService.open(UpdateCategoryModalComponent);
    modalRef.componentInstance.category = {...category};
  }

  deleteQuestion(id: string) {
    if (confirm('Emin misiniz?')) {
      return this.questionService.deleteQuestion(id);
    }
  }

  updateQuestion(question: Question) {
    const modalRef = this.modalService.open(UpdateQuestionModalComponent);
    modalRef.componentInstance.question = {...question};
  }

}
