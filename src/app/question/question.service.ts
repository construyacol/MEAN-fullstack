import { Injectable } from '@angular/core';
import { Question } from './question.model';
import { Answer } from '../answer/answer.model';
import { User } from '../auth/user.model';
import { Http, Headers, Response } from '@angular/http';
import { environment } from '../../environments/environment';
import urljoin from 'url-join';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { RequestOptions } from '@angular/http';

@Injectable()
export class QuestionService {

  private questionsUrl: string;
  private navigate: string;

  constructor(private http: Http){
    this.questionsUrl = urljoin(environment.apiUrl, 'questions');
    this.navigate = environment.apiUrl;

  }

  getQuestions(): Promise<void | Question[]>{
    return this.http.get(this.questionsUrl)
                .toPromise()
                .then(response => response.json() as Question[])
                .catch(this.handleError);
  }

  getQuestion(id): Promise<void | Question>{
   const url = urljoin(this.questionsUrl, id);
   return this.http.get(url)
          .toPromise()
          .then(response => response.json() as Question)
          .catch(this.handleError);
  }

  addQuestion(question: Question){
    const body = JSON.stringify(question);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers : headers, method: 'post'});
    // console.log(question);

    return this.http.post(this.questionsUrl, body, options)
        .map((resul:Response) =>{
           const data = resul.json();
           return data;
         })
        .catch((error: Response) => Observable.throw(error.json()));
  }

//POST /api/questions/:id/answers
  addAnswer(answer: Answer){

    const a = {
      description: answer.description,
      question: {
        _id: answer.question._id
      }
    };
    const body = JSON.stringify(a);
    // const body = answer;
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers : headers, method: 'post'});
    // console.log(question);
    // console.log(a.question._id);
    const url = urljoin(this.questionsUrl, answer.question._id, 'a');
    // console.log(url);

    return this.http.post(url, body, {headers:headers})
        .map((resul:Response) =>{
           const data = resul.json();
           return data;
         })
        .catch((error: Response) => Observable.throw(error.json()));
  }


  //POST api/questions/signin
 signinUser(user: User){

  const body = JSON.stringify(user);

  const headers = new Headers({ 'Content-Type': 'application/json' });
  const options = new RequestOptions({ headers : headers, method: 'post'});

  const url = urljoin(this.questionsUrl,'signin');

  return this.http.post(url, body, {headers:headers})
  .map((resul:Response) =>{
     const data = resul.json();
     return data;
   })
  .catch((error: Response) => Observable.throw(error.json()));



}



handleError(error: any){
  const errMsg = error.message ? error.message:
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.log(errMsg);
}

}
