import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
	selector: "app-drop-image-uploader",
	template: `<ibm-file-uploader [title]="title" [description]="description" [buttonText]="buttonText"
    		[buttonType]="buttonType" [accept]="accept" [multiple]="multiple" [skeleton]="skeleton"
    		[(files)]="files" [size]="size" drop="true" [dropText]="dropText" (filesChange)="onImageSelect($event)">
		</ibm-file-uploader>
		<div [id]="notificationId" style="width: 300px; margin-top: 20px"></div>`

})

export class ImageUploader {
	static notificationCount = 0;

	@Input() files = new Set();
	@Input() title;
	@Input() description;
	@Input() accept = [".jpg", ".png"];
	@Input() multiple;
	@Input() dropText = "Drag and drop files here of upload";
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

					console.log(fileObj, "---fileObj---53")
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

		// transferredFiles.map(file => makeFile(file));

		// const makeFile = (acceptedFiles) => {
			
		// 	const file = acceptedFiles.file;
		// 	let dataSetImg = file;
		// 	const formData = new FormData();
		// 	formData.append('files', file);
		// 	formData.append('name', 'dataSetImage')
		// }
			
		// const promises = transferredFiles.map(file => readFileAndCheckType(file));

		// Promise.all(promises).then(filePromiseArray =>
		// 	filePromiseArray.filter(filePromise => filePromise.accept)
		// 		.map(acceptedFile => acceptedFile.file))
		// 		.then(acceptedFiles => this.files = new Set(acceptedFiles))
		// 		.catch(error => console.log(error));

	}

	onUpload() {
		this.uploadFile.emit()
		// this.files.forEach(fileItem => {
		// 	if (!fileItem.uploaded) {
		// 		if (fileItem.file.size < this.maxSize) {
		// 			fileItem.state = "upload";
		// 			setTimeout(() => {
		// 				fileItem.state = "complete";
		// 				fileItem.uploaded = true;
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