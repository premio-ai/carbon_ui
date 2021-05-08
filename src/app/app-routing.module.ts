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
const routes: Routes = [
	// {
	// 	path: '',
	// 	loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
	// },
	{
		path: 'repos',
		loadChildren: () => import('./repositories/repositories.module').then(m => m.RepositoriesModule)
	},
	{ path: '', component: DashboardComponent },
	{ path: 'invdash', component: InvDashboradComponent },
	{ path: 'challenge', component: ChallangePageComponent },
	{ path: 'challenge/:id', component: InsurerComponent },
	//  { path: 'Insurer', component: InsurerComponent },
	{ path: 'ModelReport', component: ModelReportComponent },
	{ path: 'Previewpage', component: PreviewComponent },
	{ path: 'invchallenges', component: InvChallengeComponent },
	{ path: 'invaccepted', component: InvAcceptedComponent },
	{
		path: '',
		redirectTo: '',
		pathMatch: 'full'
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { useHash: true })],
	exports: [RouterModule]
})
export class AppRoutingModule { }
