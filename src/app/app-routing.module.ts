import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChallangePageComponent } from './challange-page/challange-page.component';
import { InsurerComponent } from './insurer/insurer.component';
import { ModelReportComponent } from './model-report/model-report.component';
import { PreviewComponent } from './preview/preview.component';

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
	{ path: 'challenge', component: ChallangePageComponent },
	{ path: 'Insurer', component: InsurerComponent },
	{ path: 'ModelReport', component: ModelReportComponent },
	{ path: 'Previewpage', component: PreviewComponent },
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
