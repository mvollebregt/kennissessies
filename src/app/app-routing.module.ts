import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OverviewPageComponent} from './overview-page/overview-page.component';
import {OverviewPageModule} from './overview-page/overview-page.module';

const routes: Routes = [
  {path: '**', component: OverviewPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), OverviewPageModule],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
