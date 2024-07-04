import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'; 
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-view-jobs',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './view-jobs.component.html',
  styleUrl: './view-jobs.component.css'
})
export class ViewJobsComponent implements OnInit{
  jobdets: any[] = [];
  pdfs:any;
  email:string='';
  singleInput!: ElementRef;
  private routeSubscription: Subscription | null = null;
  showUploadSection: boolean = false;
  constructor(
    private http: HttpClient,
    private router: Router,
    private apiService: ApiService,
   // private uploadService: UploadService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private authService:AuthService
  ) {}
  ngOnInit(): void {
    this.routeSubscription=this.route.queryParams.subscribe(params => {
      this.email = params['email'];
      this.getJobDets().subscribe(jobdets => {
        this.jobdets = jobdets;
      }, error => {
        console.error('Error fetching Jobs:', error);
        // Handle the error (e.g., show a message to the user)
      });
      
    });
  }
  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }
  getJobDets(): Observable<any[]> {
    const url = `http://localhost:4000/jobdets`;
    return this.http.get<any[]>(url);
  }
  toggleUpload() {
    this.showUploadSection = !this.showUploadSection;
  }
  
  selectPdf(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.pdfs = fileList[0];
      console.log(this.pdfs);
    }
  }
    
  onSubmit(jobiid:string){
    if (!this.pdfs) {
      alert("No file selected");
      console.error('No file selected.');
      return;
    }
    const formData=new FormData();
    formData.append('file',this.pdfs)
    console.log(jobiid);
    formData.append('jobid',jobiid);
    console.log(formData.get('jobid'))
      const url = `http://localhost:4000/upload`;
    this.http.post<any>(url,formData).subscribe((res)=>{
      alert("File Uploaded Successfully")
      this.singleInput.nativeElement.value=" ";
    },
    err=>{
      console.log(err);
  })
}
}
