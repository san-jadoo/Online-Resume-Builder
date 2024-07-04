import { Routes } from '@angular/router';
import { Home1Component } from './home1/home1.component';
import { Home2Component } from './home2/home2.component';
import { Home3Component } from './home3/home3.component';
import { LoginComponent } from './login/login.component';
import { ResumePreviewComponent } from './resume-preview/resume-preview.component';
import { RregisterComponent } from './rregister/rregister.component';
import { UregisterComponent } from './uregister/uregister.component';
import { ResumeFormComponent } from './resume-form/resume-form.component';
import { PostJobComponent } from './post-job/post-job.component';
import { ViewJobsComponent } from './view-jobs/view-jobs.component';
import { AuthGuard } from '../auth.gaurd';
import { JobListComponent } from './job-list/job-list.component';
import { ResumePreview1Component } from './resume-preview1/resume-preview1.component';
import { UpdatePassComponent } from './update-pass/update-pass.component';

export const routes: Routes = [
    {path:'',redirectTo:'/home' ,pathMatch:'full'},
    { path: 'home', component: Home1Component },
    { path: 'login', component: LoginComponent },
    { path: 'user-register', component: UregisterComponent },
    { path: 'rec-register', component: RregisterComponent },
    { path: 'resume-prev', component: ResumePreviewComponent,canActivate: [AuthGuard]},
    { path: 'user-home', component: Home2Component,canActivate: [AuthGuard]},
    { path: 'rec-home', component: Home3Component,canActivate: [AuthGuard]},
    { path: 'res-form', component: ResumeFormComponent,canActivate: [AuthGuard]},
    { path: 'res-preview', component: ResumePreviewComponent},
    { path: 'post-job', component: PostJobComponent,canActivate: [AuthGuard]},
    { path: 'view-jobs', component: ViewJobsComponent,canActivate: [AuthGuard]},
    { path: 'job-lists', component: JobListComponent,canActivate: [AuthGuard]},
    { path: 'res-prev1', component: ResumePreview1Component,canActivate: [AuthGuard]},
    { path: 'update-passR', component: UpdatePassComponent,canActivate: [AuthGuard]},
];
