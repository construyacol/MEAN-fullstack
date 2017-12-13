import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { User } from "../user.model";
//El servicio de signin lo importamos en el providers de app.module para declararlo de manera global en la aplicación y hacerlo accesible desde cualquier componente
import { AuthService } from '../auth.service';

@Component({
	selector: "app-signin-screen",
	templateUrl: "./signin-screen.component.html",
    styleUrls: ["./signin-screen.component.css"]
})

export class SigninScreenComponent implements OnInit {
	signinForm: FormGroup;

constructor(private authService: AuthService){}


//Validamos los requerimientos de los campos de texto de la siguiente forma:
	ngOnInit() {
		this.signinForm = new FormGroup({
			email: new FormControl(null, [
					Validators.required,
					Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
				]),
			password: new FormControl(null, Validators.required)
		});
	}

	onSubmit(){
		if (this.signinForm.valid) {
			const {email, password} = this.signinForm.value;
			const user = new User(email, password, null, null);

			this.authService.signinUser(user)
				.subscribe(
					this.authService.login,
					error => console.log(error)
				);

		}
	}
}
