import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddModule, CopyModule } from "@carbon/icons-angular";
import { HttpClientModule } from '@angular/common/http';


import { ArrowLeft16Module } from '@carbon/icons-angular/lib/arrow--left/16';

// carbon-components-angular default imports
import { UIShellModule,ButtonModule,TabsModule,GridModule,TilesModule,TagModule,ProgressIndicatorModule,BreadcrumbModule,InputModule,ToggleModule,DocumentationModule,DatePickerModule,FileUploaderModule,NumberModule,
	CheckboxModule,DropdownModule,ListModule,AccordionModule,ContentSwitcherModule,PaginationModule,TableModule,

} from 'carbon-components-angular';
import { Notification20Module } from '@carbon/icons-angular/lib/notification/20';
import { UserAvatar20Module } from '@carbon/icons-angular/lib/user--avatar/20';
import { AppSwitcher20Module } from '@carbon/icons-angular/lib/app-switcher/20';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChallangeTileComponent } from './challange-tile/challange-tile.component';
import { RequestService } from './request.service';
import { ChallangePageComponent } from './challange-page/challange-page.component';
import { ChallaneThirdStepComponent } from './challane-third-step/challane-third-step.component';
import { ChallangeSecondStepComponent } from './challange-second-step/challange-second-step.component';
import { ChallangeFirstStepComponent } from './challange-first-step/challange-first-step.component';
import { ChallangeFourthStepComponent } from './challange-fourth-step/challange-fourth-step.component';
import { InsurerComponent } from './insurer/insurer.component';
import { OverviewComponent } from './overview/overview.component';
import { DataComponent } from './data/data.component';
import { ActivityComponent } from './activity/activity.component';

import { ModelComponent } from './model/model.component';

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
	
		ModelComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		AppRoutingModule,
		UIShellModule,
		Notification20Module,
		UserAvatar20Module,
		AppSwitcher20Module,
		ButtonModule,
		TabsModule,
		AddModule,
		CopyModule,
		GridModule,
		TilesModule,
		TagModule,
		HttpClientModule,		
		ArrowLeft16Module,ProgressIndicatorModule,
		BreadcrumbModule,InputModule,
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
		
	
	],
	bootstrap: [AppComponent],
	providers : [RequestService]
})
export class AppModule { }
