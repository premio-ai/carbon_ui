import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
	selector: "app-drop-file-uploader",
	template: `<ibm-file-uploader [title]="title" [description]="description" [buttonText]="buttonText"
    [buttonType]="buttonType" [accept]="accept" [multiple]="multiple" [skeleton]="skeleton"
    [(files)]="files" [size]="size" drop="true" [dropText]="dropText" (filesChange)="onDropped($event)">
</ibm-file-uploader>

<div [id]="notificationId" style="width: 300px; margin-top: 20px"></div>
<button ibmButton *ngIf="files && files.size > 0" (click)="onUpload()">
    Upload
</button>`
// template: './file-uploader.component.html'
})

export class DragAndDropStory {
	static notificationCount = 0;

	@Input() files = new Set();
	@Input() title;
	@Input() description;
	@Input() accept = [".jpg", ".png"];
	@Input() multiple;
	@Input() dropText = "Drag and drop files here of upload";
	@Input() disabled = false;

	@Output() public goNext: EventEmitter<any> = new EventEmitter();

	protected maxSize = 500000;

    constructor() {}

	onDropped(event) {
        console.log(event, "---event---46")

		const transferredFiles = Array.from(event);
		console.log(transferredFiles, "---transferredFiles---37")

		// Creates a promise which resolves to a file and whether or not the file should be accepted.
		const readFileAndCheckType = fileObj => {
			return new Promise((resolve, reject) => {
				let fileExtension, mime;
				let reader = new FileReader();
				reader.readAsArrayBuffer(fileObj.file);
				reader.onload = () => {
					// Checks the type of file based on magic numbers.
					// const type = fileType(reader.result);
					// if (type) {
					// 	fileExtension = type.ext.replace(/^/, ".");
					// 	mime = type.mime;
					// } else {
					// 	// If a file type can not be determined using magic numbers
					// 	// then use file extension or mime type.
					// 	fileExtension = fileObj.file.name.split(".").pop().replace(/^/, ".");
					// 	mime = fileObj.file.type;
					// }

					console.log(fileObj, "---fileObj---57")
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

		// const promises = transferredFiles.map(file => readFileAndCheckType(file));

		// Promise.all(promises).then(filePromiseArray =>
		// 	filePromiseArray.filter(filePromise => filePromise.accept)
		// 		.map(acceptedFile => acceptedFile.file))
		// 		.then(acceptedFiles => this.files = new Set(acceptedFiles))
		// 		.catch(error => console.log(error));

	}

	onUpload() {
		// this.files.forEach(fileItem => {
		// 	if (!fileItem.uploaded) {
		// 		if (fileItem.file.size < this.maxSize) {
		// 			fileItem.state = "upload";
		// 			setTimeout(() => {
		// 				fileItem.state = "complete";
		// 				fileItem.uploaded = true;
		// 				console.log(fileItem);
		// 			}, 1500);
		// 		}

		// 		if (fileItem.file.size > this.maxSize) {
		// 			fileItem.state = "upload";
		// 			setTimeout(() => {
		// 				fileItem.state = "edit";
		// 				fileItem.invalid = true;
		// 				fileItem.invalidText = "File size exceeds limit";
		// 			}, 1500);
		// 		}
		// 	}
		// });
	}
}