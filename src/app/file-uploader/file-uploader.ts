import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Subscription } from 'rxjs';
import { uniqBy } from 'lodash';

@Component({
	selector: "app-drop-file-uploader",
	template: `<ibm-file-uploader [title]="title" [description]="description" [buttonText]="buttonText"
    		[buttonType]="buttonType" [accept]="accept" [multiple]="multiple" [skeleton]="skeleton"
    		[(files)]="files" [size]="size" drop="true" [dropText]="dropText" (filesChange)="onDropped()">
			</ibm-file-uploader>`
})

export class DragAndDropStory {
	static notificationCount = 0;

	@Input() files = new Set();
	@Input() title;
	@Input() description;
	@Input() accept = [".csv"];
	@Input() multiple = true;
	@Input() dropText = "Drag and drop files here or upload";
	@Input() disabled = false;

	@Output() public getFile: EventEmitter<any> = new EventEmitter();
	@Output() public uploadFile: EventEmitter<any> = new EventEmitter();

	protected maxSize = 500000;

	constructor() { }
	fileArray: any[] = []
	fileData: any
	sampleDataFile: any[] = []
	subject: Subscription

	onDropped() {
		let transferredFiles = Array.from(this.files);

		if (transferredFiles.length > 0) {
			// this.setSampleData(transferredFiles[transferredFiles.length - 1])

			let fileArr = uniqBy(transferredFiles, 'file.name')
			fileArr.map(dt => {
				this.setSampleData(dt);
				this.removeFile(dt);
			})

		}
	}

	setSampleData(acceptedFiles) {
		if (acceptedFiles) {
			const file = acceptedFiles.file;
			this.uploadFile.emit(file)
		}
	}

	removeFile(fileItem) {
		if (this.files) {
			// this.files.delete(fileItem);
			this.files.clear();
		}
	}

}