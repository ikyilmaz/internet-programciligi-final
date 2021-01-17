import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Question} from '../../models/question';
import {QuestionService} from '../../services/question.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html'
})
export class HomePageComponent implements OnInit {
  questions: Observable<Question[]>;

  constructor(private readonly questionService: QuestionService) { }

  ngOnInit(): void {
      this.questions = this.questionService.listQuestions()
  }
}
