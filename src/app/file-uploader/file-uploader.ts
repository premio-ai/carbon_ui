import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
	selector: "app-drop-file-uploader",
	template: `<ibm-file-uploader [title]="title" [description]="description" [buttonText]="buttonText"
    		[buttonType]="buttonType" [accept]="accept" [multiple]="multiple" [skeleton]="skeleton"
    		[(files)]="files" [size]="size" drop="true" [dropText]="dropText" (filesChange)="onDropped($event)">
			</ibm-file-uploader>
			<div [id]="notificationId" style="width: 300px; margin-top: 20px"></div>

			<p *ngIf="files && files.size > 3">
			<span style="font-size: x-small; color: red">Maximum 3 files can be uploaded.</span>
			</p>`
			// <button ibmButton *ngIf="files && files.size > 0 && files.size <= 3" (click)="onUpload()">Upload</button>
})

export class DragAndDropStory {
	static notificationCount = 0;

	@Input() files = new Set();
	@Input() title;
	@Input() description;
	// @Input() accept = [".jpg", ".png", ".pdf", ".txt"];
	@Input() accept = [".pdf", ".txt"];
	@Input() multiple = true;
	@Input() dropText = "Drag and drop files here of upload";
	@Input() disabled = false;

	@Output() public goNext: EventEmitter<any> = new EventEmitter();
	@Output() public uploadFile: EventEmitter<any> = new EventEmitter();

	protected maxSize = 500000;

    constructor() {}

	onDropped(event) {
		let transferredFiles = Array.from(event);
		const readFileAndCheckType = fileObj => {
			return new Promise((resolve, reject) => {
				let fileExtension, mime;
				let reader = new FileReader();
				reader.readAsArrayBuffer(fileObj.file);
				reader.onload = () => {
					transferredFiles = []
					this.goNext.emit(fileObj)
					resolve({
						file: fileObj,
						accept: (this.accept.includes(fileExtension) || this.accept.includes(mime) || !this.accept.length)
					});
				};
				reader.onerror = error => {
					reject(error);
				};
			});
		};

		// readFileAndCheckType(transferredFiles[transferredFiles.length - 1])

this.goNext.emit(transferredFiles[transferredFiles.length - 1])


	}

	onUpload() {
		this.uploadFile.emit()
	}
}