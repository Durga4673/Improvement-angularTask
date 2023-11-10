import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  // This route is responsible for generating landing pages when we run the application.
  // In this route we are lazy loadings for based on the modules
  {
    path: '',
    loadChildren: () => import('./public/public.module').then((m) =>m.PublicModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then((m) =>m.AdminModule),
    canActivate: [AuthGuard]
  },
  { path: 'Login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
