import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {VideogameComponent} from './videogame/videogame.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', component:LoginComponent},
    {path: 'register', component:RegisterComponent},
    {
    path: 'game/:title',
    loadComponent: () =>
      import('./videogame/videogame.component').then(m => m.VideogameComponent)
  },
    
];