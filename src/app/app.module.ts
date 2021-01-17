import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MyQuestionsPageComponent } from './pages/my-questions-page/my-questions-page.component';
import { MyProfilePageComponent } from './pages/my-profile-page/my-profile-page.component';
import {NgbActiveModal, NgbModalModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CreateQuestionModalComponent } from './components/create-question-modal/create-question-modal.component';
import { QuestionCardComponent } from './components/question-card/question-card.component';
import { UpdateQuestionModalComponent } from './components/update-question-modal/update-question-modal.component';
import { UpdateAnswerModalComponent } from './components/update-answer-modal/update-answer-modal.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import {AuthService} from './services/auth.service';
import { CreateCategoryModalComponent } from './components/create-category-modal/create-category-modal.component';
import { UpdateCategoryModalComponent } from './components/update-category-modal/update-category-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterPageComponent,
    HomePageComponent,
    UserLayoutComponent,
    MyQuestionsPageComponent,
    MyProfilePageComponent,
    CreateQuestionModalComponent,
    QuestionCardComponent,
    UpdateQuestionModalComponent,
    UpdateAnswerModalComponent,
    AdminPageComponent,
    CreateCategoryModalComponent,
    UpdateCategoryModalComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FontAwesomeModule,
    NgbModule,
    NgbModalModule,
  ],
  providers: [NgbActiveModal, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {
}
