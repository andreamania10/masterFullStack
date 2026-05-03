import { Routes } from '@angular/router';
import { Home } from './home/home';
import { UserDetail } from './user-detail/user-detail';
import { UserForm } from './user-form/user-form';


export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '', component: Home },
    { path: 'user/:id', component: UserDetail },
    { path: 'newUser', component: UserForm },
    { path: 'updateuser/:id', component: UserForm }
];
