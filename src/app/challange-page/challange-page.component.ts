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

	ngOnInit() {
		this.steps = [
			{
				text: "First step",
				state: ["complete"],
			},
			{
				text: "Second step",
				state: ["current"],
			},
			{
				text: "Third step",
				state: ["incomplete"],
			},
			{
				text: "Fourth step",
				state: ["incomplete", "error"],
			},
			{
				text: "Fifth step",
				state: ["incomplete"],
				disabled: true,
			},
		];
		this.current = 1;
	}

	stepSelected() {}
}
