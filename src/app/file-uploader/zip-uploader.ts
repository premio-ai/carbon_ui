import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
	selector: "app-drop-zip-uploader",
	template: `<ibm-file-uploader [title]="title" [description]="description" [buttonText]="buttonText"
    		[buttonType]="buttonType" [accept]="accept" [multiple]="multiple" [skeleton]="skeleton"
    		[(files)]="files" [size]="size" drop="true" [dropText]="dropText" (filesChange)="onImageSelect($event)">
		</ibm-file-uploader>
		<div [id]="notificationId" style="width: 300px; margin-top: 20px"></div>`

})

export class ZipUploader {
	static notificationCount = 0;

	@Input() files = new Set();
	@Input() title;
	@Input() description;
	@Input() accept = ['.zip'];
	@Input() multiple;
	@Input() dropText = "Drag and drop files here";
	@Input() disabled = false;

	@Output() public goNext: EventEmitter<any> = new EventEmitter();
	@Output() public uploadFile: EventEmitter<any> = new EventEmitter();

	protected maxSize = 500000;

    constructor() {}

	onImageSelect(event) {
		const transferredFiles = Array.from(event);

		// Creates a promise which resolves to a file and whether or not the file should be accepted.
		const readFileAndCheckType = fileObj => {
			return new Promise((resolve, reject) => {
				let fileExtension, mime;
				let reader = new FileReader();
				reader.readAsArrayBuffer(fileObj.file);
				reader.onload = () => {
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

		transferredFiles.map(file => readFileAndCheckType(file));

	}

	onUpload() {
		this.uploadFile.emit()
	}
}