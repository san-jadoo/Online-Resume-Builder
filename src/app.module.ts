import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApiService } from './api.service';
import { AppComponent } from './app/app.component';
import { Home1Component } from './app/home1/home1.component';
import { Home2Component } from './app/home2/home2.component';
import { Home3Component } from './app/home3/home3.component';
import { LoginComponent } from './app/login/login.component';
import { ResumePreviewComponent } from './app/resume-preview/resume-preview.component';
import { RregisterComponent } from './app/rregister/rregister.component';
import { UregisterComponent } from './app/uregister/uregister.component';
import { ResumeFormComponent } from './app/resume-form/resume-form.component';
import { PostJobComponent } from './app/post-job/post-job.component';
import { provideHttpClient } from '@angular/common/http';
import { JobListComponent } from './app/job-list/job-list.component';
import { ResumePreview1Component } from './app/resume-preview1/resume-preview1.component';
import { UpdatePassComponent } from './app/update-pass/update-pass.component';
const routes = [
    { path: 'register', component: UregisterComponent },
    { path: 'login', component: LoginComponent }
  ];

  @NgModule({
    declarations: [
        AppComponent,
        Home1Component,
        Home2Component,
        Home3Component,
        LoginComponent,
        ResumePreviewComponent,
        RregisterComponent,
        UregisterComponent,
        ResumeFormComponent,
        PostJobComponent,
        JobListComponent,
        ResumePreview1Component,
        UpdatePassComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes), 
        RouterModule.forRoot(routes)
  ],
  providers: [ApiService,HttpClientModule,HttpClient,ApiService],
  bootstrap: [AppComponent]
})

export class AppModule { }