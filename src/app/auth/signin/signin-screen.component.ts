import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { User } from "../user.model";
import { QuestionService } from '../../question/question.service';

@Component({
	selector: "app-signin-screen",
	templateUrl: "./signin-screen.component.html",
    styleUrls: ["./signin-screen.component.css"],
		providers: [QuestionService]
})

export class SigninScreenComponent implements OnInit {
	signinForm: FormGroup;

constructor(private questionService: QuestionService){}


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

			this.questionService.signinUser(user)
				.subscribe(
					//metodo que se ejecuta si todo sale bien - Obtenemos la propiedad _id del objeto json que obtenemos como parametro en el metodo de respuesta map(resul:Response) en addQuestion() ../question.service
					(a)=> console.log(a),
					error => console.log(error)
				);

			// console.log(user);
		}
	}
}
