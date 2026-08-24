import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ClassesComponent } from './classes/classes';
import { ClassDetailComponent } from './class-detail/class-detail';
import { AboutComponent } from './about/about';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'classes',
    component: ClassesComponent
  },
  {
    path: 'classes/:id',
    component: ClassDetailComponent
  },
  {
    path: 'about',
    component: AboutComponent,
    data: {
      title: 'About the RPG Character Builder'
    }
  }
];
