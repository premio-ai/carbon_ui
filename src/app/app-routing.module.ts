import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChallangePageComponent } from './challange-page/challange-page.component';
import { InsurerComponent } from './insurer/insurer.component';
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
