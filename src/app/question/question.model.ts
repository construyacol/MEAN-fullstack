import { Answer } from "../answer/answer.model";

export class Question{

	answers: Answer[];

	constructor(
		public tittle: string,
		public description: string,
		public createdAt?: Date,
		public icon?: string,
    public _id?: string,
		){
		this.tittle = tittle;
		this.description = description;
		this.createdAt = createdAt;
		this.icon = icon;
		this.answers = [];
    this._id = _id;
	}
}
