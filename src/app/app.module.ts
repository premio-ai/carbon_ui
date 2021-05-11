import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AddModule, CopyModule } from "@carbon/icons-angular";
import { AppSwitcher20Module } from "@carbon/icons-angular/lib/app-switcher/20";
import { ArrowLeft16Module } from "@carbon/icons-angular/lib/arrow--left/16";
import { Badge20Module } from "@carbon/icons-angular/lib/badge/20";
import { Edit20Module } from "@carbon/icons-angular/lib/edit/20";
import { EdtLoop16Module } from "@carbon/icons-angular/lib/edt-loop/16";
import { Notification20Module } from "@carbon/icons-angular/lib/notification/20";
import { Partnership16Module } from "@carbon/icons-angular/lib/partnership/16";
import { Time16Module } from "@carbon/icons-angular/lib/time/16";
import { UserAvatar20Module } from "@carbon/icons-angular/lib/user--avatar/20";
import { UserMultiple16Module } from "@carbon/icons-angular/lib/user--multiple/16";
import { Bookmark16Module } from "@carbon/icons-angular/lib/bookmark/16";
import { Bookmark20Module } from "@carbon/icons-angular/lib/bookmark/20";
import {Upload16Module} from "@carbon/icons-angular/lib/upload/16";
import {Download16Module} from "@carbon/icons-angular/lib/download/16";
import {Download20Module} from "@carbon/icons-angular/lib/download/20";
import {Chemistry32Module} from "@carbon/icons-angular/lib/chemistry/32";
import { Concept32Module } from "@carbon/icons-angular/lib/concept/32"
import {CloudUpload32Module} from "@carbon/icons-angular/lib/cloud--upload/32";
import {Idea32Module} from "@carbon/icons-angular/lib/idea/32";
import {Forum16Module} from "@carbon/icons-angular/lib/forum/16";
import {Upload20Module} from "@carbon/icons-angular/lib/upload/20";
import {Chemistry20Module} from "@carbon/icons-angular/lib/chemistry/20";
import {Trophy20Module} from "@carbon/icons-angular/lib/trophy/20";
import {UserMultiple20Module} from "@carbon/icons-angular/lib/user--multiple/20";
import {CheckmarkOutline20Module} from "@carbon/icons-angular/lib/checkmark--outline/20";
// carbon-components-angular default imports
import {
	AccordionModule,
	LoadingModule,
	BreadcrumbModule,
	ButtonModule,
	CheckboxModule,
	ContentSwitcherModule,
	DatePickerModule,
	DocumentationModule,
	DropdownModule,
	FileUploaderModule,
	GridModule,
	InputModule,
	ListModule,
	NotificationModule,
	NumberModule,
	PaginationModule,
	ProgressIndicatorModule,
	SearchModule,
	TableModule,
	TabsModule,
	TagModule,
	TilesModule,
	ToggleModule,
	UIShellModule,
} from "carbon-components-angular";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ChallaneThirdStepComponent } from "./challane-third-step/challane-third-step.component";
import { ChallangeFirstStepComponent } from "./challange-first-step/challange-first-step.component";
import { ChallangeFourthStepComponent } from "./challange-fourth-step/challange-fourth-step.component";
import { ChallangePageComponent } from "./challange-page/challange-page.component";
import { ChallangeSecondStepComponent } from "./challange-second-step/challange-second-step.component";
import { ChallangeTileComponent } from "./challange-tile/challange-tile.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { DataComponent } from "./data/data.component";
import { HeaderComponent } from "./header/header.component";
import { InsurerComponent } from "./insurer/insurer.component";
import { InvAcceptedComponent } from "./inv-accepted/inv-accepted.component";
import { InvChallengeTileComponent } from "./inv-challenge-tile/inv-challenge-tile.component";
import { InvChallengeComponent } from "./inv-challenge/inv-challenge.component";
import { InvDashboradComponent } from "./inv-dashborad/inv-dashborad.component";
import { InvModelViewComponent } from "./inv-model-view/inv-model-view.component";
import { InvSeePerformanceComponent } from "./inv-see-performance/inv-see-performance.component";
import { ActivityComponent } from "./activity/activity.component";

import { DragAndDropStory } from './file-uploader/file-uploader';

import { ModelReportComponent } from "./model-report/model-report.component";
import { ModelComponent } from "./model/model.component";
import { OverviewComponent } from "./overview/overview.component";
import { PreviewComponent } from "./preview/preview.component";
import { RequestService } from "./request.service";
import { SubmissionStepFourComponent } from "./submission-step-four/submission-step-four.component";
import { SubmissionStepOneComponent } from "./submission-step-one/submission-step-one.component";
import { SubmissionStepThreeComponent } from "./submission-step-three/submission-step-three.component";
import { SubmissionStepTwoComponent } from "./submission-step-two/submission-step-two.component";
import { from } from "rxjs";
import {CheckmarkFilled16Module} from "@carbon/icons-angular/lib/checkmark--filled/16";
import {RadioButton20Module} from "@carbon/icons-angular/lib/radio-button/20"
@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		DashboardComponent,
		ChallangeTileComponent,
		ChallangePageComponent,
		ChallaneThirdStepComponent,
		ChallangeSecondStepComponent,
		ChallangeFirstStepComponent,
		ChallangeFourthStepComponent,
		InsurerComponent,
		OverviewComponent,
		DataComponent,
		ActivityComponent,
		
		DragAndDropStory,

		ModelComponent,

		ModelReportComponent,

		PreviewComponent,

		InvDashboradComponent,

		InvChallengeTileComponent,
		InvAcceptedComponent,

		InvChallengeComponent,

		SubmissionStepOneComponent,

		SubmissionStepTwoComponent,

		SubmissionStepThreeComponent,

		SubmissionStepFourComponent,

		InvModelViewComponent,

		InvSeePerformanceComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		LoadingModule,
		AppRoutingModule,
		UIShellModule,
		Notification20Module,
		UserAvatar20Module,
		AppSwitcher20Module,
		Edit20Module,
		Badge20Module,
		Download20Module,
		ButtonModule,
		TabsModule,
		AddModule,
		CopyModule,
		GridModule,
		TilesModule,
		TagModule,
		HttpClientModule,
		ArrowLeft16Module,
		ProgressIndicatorModule,
		BreadcrumbModule,
		InputModule,
		ToggleModule,
		DocumentationModule,
		DatePickerModule,
		FileUploaderModule,
		NumberModule,
		CheckboxModule,
		DropdownModule,
		ListModule,
		AccordionModule,
		ContentSwitcherModule,
		PaginationModule,
		TableModule,
		NotificationModule,
		SearchModule,

		Time16Module,
		EdtLoop16Module,
		UserMultiple16Module,
		Partnership16Module,
		Bookmark16Module,
		Upload16Module,
		Download16Module,
		CloudUpload32Module,
		Chemistry32Module,
		Concept32Module,
		Idea32Module,
		Forum16Module,
		Upload20Module,
		Chemistry20Module,
		CheckmarkOutline20Module,
		Trophy20Module,
		UserMultiple20Module,
		Bookmark20Module,
		CheckmarkFilled16Module,
		RadioButton20Module,
	],
	bootstrap: [AppComponent],
	providers: [RequestService],
})
export class AppModule {}
