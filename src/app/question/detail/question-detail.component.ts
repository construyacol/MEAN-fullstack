import { Component, OnInit } from "@angular/core";
import { Question } from "../question.model";
import { QuestionService } from '../question.service';
//nos va a permitir poder obtener parametros de la ruta
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-question-detail",
  templateUrl:"./question-detail.component.html",
  styleUrls:["./question-detail.component.css"],
  providers:[QuestionService]
})

export class QuestionDetailComponent implements OnInit {

  question?: Question;
  loading = true;
  sub: any;

  constructor(
    private questionService: QuestionService,
    private route: ActivatedRoute
  ){}

  //
  ngOnInit(){
    this.sub = this.route.params.subscribe(params => {
      //esta es la variable de ruta en ../question.routing (:id)
      this.questionService
          .getQuestion(params.id)
          .then((question: Question)=>{
            this.question = question;
            this.loading = false;
            // console.log(this.question);
          });
    });
  };

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

}



	// question: Question = new Question(
	// 	"Esta es una nueva pregunta sobre android",
	// 	"Miren, tengo una duda con una aplicación que estoy escribien...",
	// 	new Date,
	// 	"devicon-android-plain"
	// 	);
