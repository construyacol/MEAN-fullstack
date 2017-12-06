import { Component} from "@angular/core";
import { NgForm } from "@angular/forms";
import { Question } from "../question.model";
import icons from "../icons";
import { QuestionService } from '../question.service';
import { Router } from '@angular/router';

@Component({
	selector:"app-question-form",
	templateUrl: "./question-form.component.html",
	styleUrls: ["./question-form.component.css"],
	providers: [QuestionService]
})

export class QuestionFormComponent{
	icons: Object[] = icons;

	constructor(
		private questionService: QuestionService,
		private router: Router
	 ){}

	getIconVersion(icon: any){
		let version;
		if(icon.versions.font.includes('plain-wordmark')){
				 version = 'plain-wordmark';
		} else {
			   version = icon.versions.font[0];
		}
		return version;
	}

	onSubmit(form: NgForm){

		const q = new Question(
			form.value.title,
			form.value.description,
			new Date(),
			form.value.icono
		);

		this.questionService.addQuestion(q)
				.subscribe(
					//metodo que se ejecuta si todo sale bien - Obtenemos la propiedad _id del objeto json que obtenemos como parametro en el metodo de respuesta map(resul:Response) en addQuestion() ../question.service
					({_id})=> this.router.navigate(['/questions', _id]),
					// ({_id})=> console.log(_id),
					error => console.log(error)
				);
		// console.log(icons[10].name);
		form.reset();
	}
}
