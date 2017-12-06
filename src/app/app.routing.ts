import { RouterModule, Routes } from '@angular/router';
import { QuestionListComponent } from './question/list/question-list.component';
import { SigninScreenComponent } from './auth/signin/signin-screen.component';
import { signupScreenComponent } from './auth/signup/signup-screen.component';
import { QUESTION_ROUTES } from './question/question.routing';

const APP_ROUTES: Routes = [

  { path: '', component: QuestionListComponent, pathMatch: 'full' },
  { path: 'signin', component: SigninScreenComponent },
  { path: 'signup', component: signupScreenComponent },
  { path: 'questions', children: QUESTION_ROUTES }

];

export const Routing = RouterModule.forRoot(APP_ROUTES);
