import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ClassesComponent } from './classes/classes.component';
import { ClassDetailComponent } from './class-detail/class-detail.component';
import { AboutComponent } from './about/about.component';
import { AbilityRollerComponent } from './ability-roller/ability-roller.component';
import { CharacterBuilderComponent } from './character-builder/character-builder.component';
import { authGuard } from './auth.guard';
import { SigninComponent } from './signin/signin.component';

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
    path: 'roll/:sides',
    component: AbilityRollerComponent
  },
  {
    path: 'about',
    component: AboutComponent,
    data: {
      title: 'About the RPG Character Builder'
    }
  },
  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: 'builder', 
    component: CharacterBuilderComponent,
    canActivate: [authGuard]
  }
];
