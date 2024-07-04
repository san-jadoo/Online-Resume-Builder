import { Component, OnInit } from '@angular/core';  
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { ApiService } from '../../api.service';
import { HttpClient } from '@angular/common/http';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-resume-form',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './resume-form.component.html',
  styleUrl: './resume-form.component.css'
})
export class ResumeFormComponent implements OnInit{
  resumeForm: FormGroup;
  private routeSubscription: Subscription | null = null;
  name :string='';
  email :string='';
  phone :string='';
  summary :string='';
  exp :string[] = [];
  education: string[] = [];
  cert: string[] = [];
  proj: string[] = [];
  skill: string[] = [];
  intrests: string[] = [];


  constructor(private ApiService: ApiService,private route: ActivatedRoute,private router:Router,private formBuilder: FormBuilder) {
    this.resumeForm = this.formBuilder.group({
  uname :'',
  email :'',
  phone :'',
  summary :'',
  exp : [],
  education: [],
  cert: [],
  proj: [], 
  skill: [],
  intrests: []
});
  }
  ngOnInit(): void {
    this.routeSubscription=this.route.queryParams.subscribe(params => {
    this.email = params['email'];
      });
  }
  ngOnDestroy(): void {
      if (this.routeSubscription) {
        this.routeSubscription.unsubscribe();
      }
    }
  onSubmit(){
    const resumeData = { 
    name : this.name,
    email : this.email,
    phone : this.phone,
    summary : this.summary,
    exp : this.exp,
    education: this.education,
    cert: this.cert,
    proj: this.proj
    }
    this.ApiService.createResume(resumeData).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error(error);
        // Handle error
      }
      );
  
  //alert('Quiz Created Successfully')
  this.router.navigate(['/res-preview'],{queryParams:{email:this.email}});
}
onSubmit1(){
  const resumeData = { 
  name : this.name,
  email : this.email,
  phone : this.phone,
  summary : this.summary,
  exp : this.exp,
  education: this.education,
  cert: this.cert,
  proj: this.proj
  }
  this.ApiService.createResume(resumeData).subscribe(
    (response) => {
      console.log(response);
    },
    (error) => {
      console.error(error);
      // Handle error
    }
    );
this.router.navigate(['/res-prev1'],{queryParams:{email:this.email}});
}
}