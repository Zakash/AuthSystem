import { Routes } from '@angular/router';
import { HomeComponent} from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from '../guards/auth-guard.service';


export const dashboardRoutes: Routes = [
  {
    path: 'dashboard',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full'},
      { path: 'home', component: HomeComponent },
      ]
  }
];
