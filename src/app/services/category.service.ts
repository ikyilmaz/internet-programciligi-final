import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Category} from '../models/category';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private readonly db: AngularFireDatabase) {

  }

  listCategories() {
    return this.db.list<Category>('categories')
      .snapshotChanges()
      .pipe(map(changes => changes.map(change => ({id: change.key, ...change.payload.val()}) as Category)));
  }

  getCategoryByID(id: string) {
    return this.db.object<Category>(`categories/${id}`).snapshotChanges().pipe(map(change => ({id: change.key, ...change.payload.val()}) as Category));
  }

  createCategory(category: Category) {
    this.db.list<Category>('categories').push(category);
  }

  updateCategory(category: Category) {
    return this.db.object<Category>(`categories/${category.id}`).update({name: category.name});
  }

  deleteCategory(id: string) {
    return this.db.object<Category>(`categories/${id}`).remove();
  }
}
