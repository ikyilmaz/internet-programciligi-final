import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Category} from '../../models/category';
import {CategoryService} from '../../services/category.service';

@Component({
  selector: 'app-create-category-modal',
  templateUrl: './create-category-modal.component.html',
})
export class CreateCategoryModalComponent implements OnInit {
  category: Category = new Category();

  constructor(public activeModal: NgbActiveModal, private readonly categoryService: CategoryService) {
  }

  ngOnInit(): void {
  }

  createCategory() {
    this.categoryService.createCategory(this.category)
    this.activeModal.close();
  }

}
