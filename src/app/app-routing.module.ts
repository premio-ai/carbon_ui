import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChallangePageComponent } from './challange-page/challange-page.component';
import { InsurerComponent } from './insurer/insurer.component';
import { ModelReportComponent } from './model-report/model-report.component';
import { PreviewComponent } from './preview/preview.component';
import { InvDashboradComponent } from './inv-dashborad/inv-dashborad.component';
import { InvAcceptedComponent } from './inv-accepted/inv-accepted.component';
import { InvChallengeComponent } from './inv-challenge/inv-challenge.component';
import { InvModelViewComponent } from './inv-model-view/inv-model-view.component';
import { LoginComponent } from './login/login.component';
import { InvSeePerformanceComponent } from './inv-see-performance/inv-see-performance.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LandingComponent } from './landing/landingPage';

const routes: Routes = [
	// {
	// 	path: '',
	// 	loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
	// },
	{
		path: 'repos',
		loadChildren: () => import('./repositories/repositories.module').then(m => m.RepositoriesModule)
	},
	{ path: 'dashboard', component: DashboardComponent },
	// { path: '', component: DashboardComponent },
	{ path: 'invdash', component: InvDashboradComponent },
	{ path: 'challenge', component: ChallangePageComponent },
	{ path: 'challenge/:id', component: InsurerComponent },
	//  { path: 'Insurer', component: InsurerComponent },
	{ path: 'modelReport/:id', component: ModelReportComponent },
	{ path: 'Previewpage', component: PreviewComponent },
	{ path: 'invchallenges', component: InvChallengeComponent },
	// { path: 'invaccepted', component: InvAcceptedComponent },
	{ path: 'invaccepted/:id', component: InvAcceptedComponent },
	{ path: 'invmodel-view/:id', component: InvModelViewComponent },
	{ path: 'see-performance', component: InvSeePerformanceComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'signup', component: SignUpComponent },
	{ path: 'see-performance/:id', component: InvSeePerformanceComponent },
	{ path: '', component: LandingComponent },
	{
		path: '',
		redirectTo: '',
		pathMatch: 'full'
	},
	
	// { path: 'dashboard', component: DashboardComponent },
	// { path: '', component: LoginComponent },

	
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { useHash: true })],
	exports: [RouterModule]
})
export class AppRoutingModule { }
