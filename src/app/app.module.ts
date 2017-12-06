import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpModule } from '@angular/http';

import { AppComponent } from "./app.component";

//Material Angular
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { MaterialModule } from "./material.module";

import "hammerjs";

import { QuestionDetailComponent } from "./question/detail/question-detail.component";
import { QuestionListComponent } from "./question/list/question-list.component";
import { QuestionFormComponent } from "./question/form/question-form.component";
import { AnswerFormComponent } from "./answer/answer-form.component";
import { SigninScreenComponent } from "./auth/signin/signin-screen.component";
import { signupScreenComponent } from "./auth/signup/signup-screen.component";

import { Routing } from './app.routing';




import { MomentModule } from "angular2-moment";

@NgModule({
  declarations: [
    AppComponent,
    QuestionDetailComponent,
    AnswerFormComponent,
    SigninScreenComponent,
    signupScreenComponent,
    QuestionListComponent,
    QuestionFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    MomentModule,
    FormsModule,
    ReactiveFormsModule,
    Routing,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {}
