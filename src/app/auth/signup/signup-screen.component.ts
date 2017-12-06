import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { User } from "../user.model";

@Component({
	selector: "app-signup-screen",
	templateUrl: "./signup-screen.component.html",
    // styleUrls: ["./signin-screen.component.css"] 
})

export class signupScreenComponent implements OnInit{

signupForm: FormGroup;

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
			console.log(user);
		}
	}
 
} 