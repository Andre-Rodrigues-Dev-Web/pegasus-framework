import { Routes } from '@angular/router';
import { Component } from '@angular/core';

@Component({ template: '<h2>Home Page</h2>', standalone: true }) class HomeComponent {}
@Component({ template: '<h2>About Page</h2>', standalone: true }) class AboutComponent {}
@Component({ template: '<h2>Contact Page</h2>', standalone: true }) class ContactComponent {}

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent }
];
