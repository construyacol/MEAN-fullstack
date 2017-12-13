import { Injectable } from '@angular/core';
import urljoin from 'url-join';
import { environment } from '../../environments/environment';
import { User } from '../auth/user.model';
import { Http, Headers, Response } from '@angular/http';
// import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class AuthService {

    usersUrl: string;
    currentUser?: User;

    constructor(
      private http: Http,
      private router: Router,
      public snackBar: MatSnackBar
    ){

      this.usersUrl = urljoin(environment.apiUrl, 'auth');
      if(this.isLoggedIn()){
        //despues de validar el token, traemos de local storage en un archivo plano lo siguiente
         const { userId, email, firstname } = JSON.parse(localStorage.getItem('user'));
         this.currentUser = new User(email, null, firstname, null, userId);
      }
    }


    signupUser(user: User){

      const body = JSON.stringify(user);
      const headers = new Headers({ 'Content-Type': 'application/json' });
      const url = urljoin(this.usersUrl,'signup');

      return this.http.post(url, body, {headers:headers})
      .map((resul:Response) =>{
         const json = resul.json();
         this.login(json);
         return json;
       })
      .catch((error: Response) => {
        console.log(error);
        return Observable.throw(error.json())
      } );
    }


    signinUser(user: User){

     const body = JSON.stringify(user);
     const headers = new Headers({ 'Content-Type': 'application/json' });

     const url = urljoin(this.usersUrl,'signin');

     return this.http.post(url, body, {headers:headers})
     .map((resul:Response) =>{
        const json = resul.json();
        this.login(json);
        return json;
      })
     .catch((error: Response) => Observable.throw(error.json()));
   }

     login = ({token, userId, firstname, lastname, email}) => {
       this.currentUser = new User(email, null, firstname, lastname, userId);
       localStorage.setItem('token', token);
       // localStorage.setItem('user', JSON.stringify(userId, firstname, lastname, email));
       localStorage.setItem('user', JSON.stringify(this.currentUser));
       console.log(token);
       this.router.navigateByUrl('/');
     }

     isLoggedIn(){
       // Verificamos si llego el token o esta vacio null
       return localStorage.getItem('token') !== null
     }

     logout(){
       localStorage.clear();
       this.currentUser = null;
       this.router.navigateByUrl('/signin');
     }

     showError(message){
       // this.snackBar.open(message, 'x', {duration: 2500});
       this.snackBar.openFromComponent(message, {
      duration: 500,
    });
     }

     public handleError (error: any) {
       //asignamos la variable de name al error
        // const {error: {name}, message } = error;
              // this.showError('Tu Sesión ha expirado');
              this.snackBar.open('Debes iniciar sesión', 'x', {duration: 2500});
     }

}
