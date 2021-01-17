import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList, QueryFn} from '@angular/fire/database';
import {Question} from '../models/question';
import {map} from 'rxjs/operators';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {UserProfile} from '../models/user-profile';
import {Answer} from '../models/answer';
import {Category} from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private readonly questionsURL: string = 'questions';

  private questionsRef: AngularFireList<Question>;

  constructor(
    private readonly db: AngularFireDatabase,
    private readonly authService: AuthService
  ) {
    this.questionsRef = this.db.list<Question>(this.questionsURL);
  }

  listQuestions(queryFn?: QueryFn): Observable<Question[]> {
    return this.db.list<Question>(this.questionsURL, queryFn).snapshotChanges().pipe(map(changes => changes.map(c => {
      const question = {id: c.key, ...c.payload.val()};

      // Soruların Kategorisi
      this.db
        .list<Category>('categories', ref => ref.orderByKey().equalTo(question.categoryId).limitToFirst(1))
        .snapshotChanges()
        .pipe(map(([change]) => ({id: change.key, ...change.payload.val()}) as Category))
        .subscribe(category => question.category = category);

      // Soruların Cevapları
      this.db
        .list<Answer>('answers', ref => ref.orderByChild('questionId').equalTo(question.id))
        .snapshotChanges()
        .pipe(map(changes => changes.map(c => {
          const answer = {id: c.key, ...c.payload.val()};

          // Cevapların Sahipleri
          this.db
            .list<UserProfile>('user_profiles', ref => ref.orderByChild('userId').equalTo(answer.ownerId))
            .snapshotChanges()
            .pipe(map(changes => changes.map(c => ({id: c.key, ...c.payload.val()}))))
            .subscribe(userProfile => answer.userProfile = userProfile[0]);

          return answer;
        })))
        .subscribe(answers => question.answers = answers);

      // Soruların Sahipleri
      this.db
        .list<UserProfile>('user_profiles', ref => ref.orderByChild('userId').equalTo(question.ownerId))
        .snapshotChanges()
        .subscribe(changes => question.userProfile = {id: changes[0].key, ...changes[0].payload.val()});

      return question;
    })));
  }

  getOneQuestion(id: string) {
    return this.db.object<Question>(this.questionsURL).snapshotChanges().pipe(map(change => ({id: change.key, ...change.payload.val()})));
  }

  async createQuestion(question: Question): Promise<Question> {
    const snapshot = await this.questionsRef
      .push({...question, ownerId: this.authService.currentUser.user.uid})
      .get();

    return {
      id: snapshot.key,
      ...snapshot.val()
    };
  }

  updateQuestion({id, ...question}: Question) {
    return this.db.object<Question>(`${this.questionsURL}/${id}`).update(question);
  }

  async deleteQuestion(id: string) {
    await this.db.object<Question>(`${this.questionsURL}/${id}`).remove();
    await this.db.list<Answer>('answers', ref => ref.orderByChild('questionId').equalTo(id))
      .snapshotChanges()
      .subscribe(changes => changes.forEach(c => this.db.object<Answer>(`answers/${c.key}`).remove()));
  }
}
