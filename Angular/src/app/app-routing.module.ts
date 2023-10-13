import { NgModule, createComponent } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_helpers';
import { Role } from './_models';
import { ProfileComponent } from './profile/profile.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { ErrorPageComponent } from './error-page/error-page.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        //canActivate: [AuthGuard]
    },
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] }
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
      path: 'profile/:id',
      component: ProfileComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'create',
      component: CreateComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'edit/:id',
      component: EditComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'error',
      component : ErrorPageComponent,
      canActivate : [AuthGuard],
    },

    // otherwise redirect to home
    { path: '**', redirectTo: 'error' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
