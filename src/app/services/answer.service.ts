import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {AuthService} from './auth.service';
import {Answer} from '../models/answer';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  private readonly answersURL: string = 'answers';

  private answersRef: AngularFireList<Answer>;

  constructor(
    private readonly db: AngularFireDatabase,
    private readonly authService: AuthService
  ) {
    this.answersRef = this.db.list<Answer>(this.answersURL);
  }

  async createAnswer({content, questionId}: Answer): Promise<Answer> {
    const snapshot = await this.answersRef
      .push({ownerId: this.authService.currentUser.user.uid, content, questionId})
      .get();

    return {
      id: snapshot.key,
      ...snapshot.val()
    };
  }

  updateAnswer({id, ...answer}: Answer) {
    return this.db.object<Answer>(`${this.answersURL}/${id}`).update(answer);
  }

  deleteAnswer(id: string) {
    return this.db.object<Answer>(`${this.answersURL}/${id}`).remove();
  }
}
