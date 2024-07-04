import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

interface Job{
  jobid: string;
  jobname: string;
  company: string;
  location: string;
  postype: string;
  jobdescr: string;
  jobqualif: string;
  ldate: string;
}

@Component({
  selector: 'app-post-job',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './post-job.component.html',
  styleUrl: './post-job.component.css'
})
export class PostJobComponent {
  constructor(private http:HttpClient,private userService: ApiService,private router:Router,private authService:AuthService) {}

  job: Job = {
  jobid:"",
  jobname: "",
  company: "",
  location: "",
  postype: "",
  jobdescr: "",
  jobqualif: "",
  ldate: "",
 // pby: ""
  };
  
  postJob(): void {

    const jobData = {
      jobid:this.job.jobid,
      jobname:this.job.jobname,
      comp: this.job.company,
      loc: this.job.location,
      postp: this.job.postype,
      jdescr: this.job.jobdescr,
      jqlf: this.job.jobqualif,
      ldt: this.job.ldate,

    };
    console.log(jobData)
    this.userService.postJobDet(jobData).subscribe(
      response => {
        console.log(jobData)
        console.log('Job Posted successfully:', response);
        alert("Job Posted Successfully");
        window.location.reload();
      },
      error => {
        console.error('Error Posting Job:', error);
      }
    );
  }
}
