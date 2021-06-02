import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Subscription } from 'rxjs';
import { RequestService } from '../request.service';

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
})

export class DragAndDropStory {
	static notificationCount = 0;

	@Input() files = new Set();
	@Input() title;
	@Input() description;
	// @Input() accept = [".jpg", ".png", ".pdf", ".txt"];
	@Input() accept = [".pdf", ".txt"];
	@Input() multiple = true;
	@Input() dropText = "Drag and drop files here or upload";
	@Input() disabled = false;

	@Output() public getFile: EventEmitter<any> = new EventEmitter();
	@Output() public uploadFile: EventEmitter<any> = new EventEmitter();

	protected maxSize = 500000;

	constructor(
		private requestService: RequestService
	) { }
	fileArray: any[] = []
	fileData: any
	sampleDataFile: any[] = []
	subject: Subscription

	onDropped(event) {
		let transferredFiles = Array.from(event);

		if (transferredFiles.length > 0) {
			this.setSampleData(transferredFiles[transferredFiles.length - 1])
		}
	}

	setSampleData(acceptedFiles) {
		if (acceptedFiles) {
			const file = acceptedFiles.file;
			this.uploadSampleData(file)
		}
	}

	uploadSampleData(file) {
		this.fileData = new FormData();
		this.fileData.append('files', file);
		const formData = this.fileData;
		this.fileData.delete('FormData');
		let tempData = []
		this.fileArray = []
		if (formData) {
			this.subject = this.requestService.post('upload', formData).subscribe(data => {
					let fileObj = {
						path: data[0].filename,
						downloadCount: 0
					}
					tempData.push(fileObj)
				this.getFile.emit(tempData)
			})
		}

	}

	ngOnDestroy() {
		this.subject.unsubscribe()
	}

}