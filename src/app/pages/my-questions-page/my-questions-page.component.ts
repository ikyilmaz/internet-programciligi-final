import {Component, OnInit} from '@angular/core';
import {QuestionService} from '../../services/question.service';
import {Observable} from 'rxjs';
import {Question} from '../../models/question';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-my-surveys-page',
  templateUrl: './my-questions-page.component.html'
})
export class MyQuestionsPageComponent implements OnInit {

  public questions: Observable<Question[]>;

  constructor(private readonly questionService: QuestionService, private readonly authService: AngularFireAuth) {

  }

  async ngOnInit() {
    const user = await this.authService.currentUser;
    this.questions = this.questionService.listQuestions(ref => ref.orderByChild('ownerId').equalTo(user.uid));
  }

}
