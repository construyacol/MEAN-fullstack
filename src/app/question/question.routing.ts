import { QuestionListComponent } from './list/question-list.component';
import { QuestionDetailComponent } from './detail/question-detail.component';
import { QuestionFormComponent } from './form/question-form.component';

export const  QUESTION_ROUTES = [
  { path: '', component: QuestionListComponent },
  { path: 'new', component: QuestionFormComponent },
  { path: ':id', component: QuestionDetailComponent }
];
