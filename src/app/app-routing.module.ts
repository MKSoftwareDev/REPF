import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import {DatePipe} from '@angular/common';

// imports
import { BrowserModule } from '@angular/platform-browser';






import { LayoutComponent } from './layouts/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { Dashboard7Component } from './pages/dashboard-7/dashboard-7.component';


import { LogoutComponent } from './pages/logout/logout.component';
import { LoginComponent } from './pages/login/login.component';

import { LockscreenComponent } from './pages/lockscreen/lockscreen.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { Error404Component } from './pages/error-404/error-404.component';
import { Error4042Component } from './pages/error-404-2/error-404-2.component';
import { Error403Component } from './pages/error-403/error-403.component';
import { Error500Component } from './pages/error-500/error-500.component';
import { SucursalComponent } from './pages/sucursal/sucursal.component';

import { EmpresaListComponent } from './pages/empresa/list/list.component';
import { EmpresaEditComponent } from './pages/empresa/edit/edit.component';

import { AddSucursalComponent } from './pages/sucursal/add/add.component';
import { PeopleComponent } from './pages/people/listar/list.people.component';
import { PeopleEditComponent } from './pages/people/editar/edit.people.component';

const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {
        "path": "",
        "component": LayoutComponent,
        "children": [
            {
                path: "index",
                component: Dashboard7Component
            },
            {
                path: "logout",
                component: LogoutComponent
            },            
            {
                path: "dashboard_7",
                component: Dashboard7Component
            },

            {
                path:"sucursal",
                component: SucursalComponent
            },
            {
                path:"sucursal/new",
                component: AddSucursalComponent
            },
            {
                path:"empresa/list",
                component: EmpresaListComponent
            },       
            {
                path:"empresa/edit/:_id",
                component: EmpresaEditComponent
            },
            {
                path:"people",
                component: PeopleComponent
            },
            {
                path:"people/new",
                component: PeopleEditComponent
            }     
        ]
    },

    {
        path: "login",
        component: LoginComponent
    },
   
    {
        "path": "lockscreen",
        "component": LockscreenComponent
    },
    {
        "path": "forgot_password",
        "component": ForgotPasswordComponent
    },
    {
        "path": "error_404",
        "component": Error404Component
    },
    {
        "path": "error_404-2",
        "component": Error4042Component
    },
    {
        "path": "error_403",
        "component": Error403Component
    },
    {
        "path": "error_500",
        "component": Error500Component
    },
    {
        "path": "**",
        "redirectTo": "error_404",
        "pathMatch": "full"
    },
];

@NgModule({
  declarations: [
    HomeComponent,
    Dashboard7Component,
    LoginComponent,
    LogoutComponent, 
    LockscreenComponent,
    ForgotPasswordComponent,    
    Error404Component,
    Error4042Component,
    Error403Component,
    Error500Component,        
    SucursalComponent,
    EmpresaListComponent,    
    EmpresaEditComponent,
    AddSucursalComponent,
    PeopleComponent,
    PeopleEditComponent    
  ],
  imports: [ RouterModule.forRoot(routes), FormsModule,ReactiveFormsModule,CommonModule,BrowserModule ],
  exports: [ RouterModule,ReactiveFormsModule,CommonModule],
  providers: [ReactiveFormsModule,DatePipe]
})


export class AppRoutingModule { }
