import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './add/auth/auth.guard';
import { AddHtmlPageComponents } from './add/htmlpage/htmlpage.component';
import { ListComponent } from './add/htmlpage/list/list.component';

const routes: Routes = [
  {path:'', component: ListComponent},
  {path:'create', component: AddHtmlPageComponents, canActivate:[AuthGuard]},
  {path:'edit/:taskId', component: AddHtmlPageComponents, canActivate:[AuthGuard]},
  // {path:'auth', loadChildren: './auth/auth.module#AuthModule', canActivate:[AuthGuard]},
  {path:'auth', loadChildren: () => import('src/app/add/auth/auth.module').then(m=>m.AuthModule)}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
