import {Component, Input, OnInit} from '@angular/core';
import {Category} from '../../models/category';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {CategoryService} from '../../services/category.service';
import {Result} from '../../models/result';

@Component({
  selector: 'app-update-category-modal',
  templateUrl: './update-category-modal.component.html'
})
export class UpdateCategoryModalComponent implements OnInit {
  @Input() category: Category;
  result: Result = new Result();

  constructor(public activeModal: NgbActiveModal, private readonly categoryService: CategoryService) {

  }

  async ngOnInit() {

  }

  async updateCategory() {
    await this.categoryService.updateCategory({...this.category});
    await this.result.showSuccessAlert('Başarılı', {timeout: 1000});
    this.activeModal.close();
  }

}
