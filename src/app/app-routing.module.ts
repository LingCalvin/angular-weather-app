import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { SettingsComponent } from './settings/settings.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'about', component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
