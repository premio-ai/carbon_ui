import { Component, OnInit } from "@angular/core";

@Component({
	selector: "app-challange-page",
	templateUrl: "./challange-page.component.html",
	styleUrls: ["./challange-page.component.scss"],
})
export class ChallangePageComponent implements OnInit {
	constructor() {}

	current: number;
	steps: any[];

	challange : {
		title : string;
		description : string;
	}


	ngOnInit() {
		this.steps = [
			{
				text: "Step 1",
				state: ["complete"],
			},
			{
				text: "Step 2",
				state: ["current"],
			},
			{
				text: "Step 3",
				state: ["incomplete"],
			},
			{
				text: "Step 4",
				state: ["incomplete"],
			},
			{
				text: "Step 5",
				state: ["incomplete"],
				disabled: true,
			},
		];
		this.current = 2;
	}

	stepSelected() {}

	nextStep(){
		this.current = 2
	}
}
