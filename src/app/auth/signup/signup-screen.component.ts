import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { User } from "../user.model";
import { AuthService } from '../auth.service';


@Component({
	selector: "app-signup-screen",
	templateUrl: "./signup-screen.component.html",
    // styleUrls: ["./signin-screen.component.css"]
})

export class signupScreenComponent implements OnInit{

signupForm: FormGroup;

constructor(private authService:AuthService){}


	ngOnInit(){
		this.signupForm = new FormGroup({
			fname: new FormControl(null, Validators.required),
			lname: new FormControl(null, Validators.required),
			email: new FormControl(null, [
					Validators.required,
					Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
				]),
			password: new FormControl(null, Validators.required)
		})
	}

	onSubmit(){
		if (this.signupForm.valid){
			const {fname, lname, email, password} = this.signupForm.value;
			const user = new User(email, password, fname, lname );
			// console.log(user);
			this.authService.signupUser(user)
				.subscribe(
					//metodo que se ejecuta si todo sale bien - Obtenemos la propiedad _id del objeto json que obtenemos como parametro en el metodo de respuesta map(resul:Response) en addQuestion() ../question.service
					this.authService.login,
					// (a) => console.log(a),
					error => console.log(error)
				);
		}
	}

}
