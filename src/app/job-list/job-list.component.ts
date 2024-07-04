// JobListComponent
import { Component, ElementRef, NgModule, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { AuthService } from '../../auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
  jobdets: any[] = [];
  email: string = '';
  private routeSubscription: Subscription | null = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.queryParams.subscribe(params => {
      this.email = params['email'];
      this.getJobDets().subscribe(jobdets => {
        this.jobdets = jobdets;
      }, error => {
        console.error('Error fetching Jobs:', error);
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

  removeJob(id:string): void {
    alert(id);
    this.apiService.remove(id).subscribe(
      () => {
        console.log('Job Details deleted successfully.');
        alert('Job Details deleted successfully');
        window.location.reload();
      },
      (error: any) => {
        console.error('Failed to delete Job Details :', error);
      }
    );
  }
}
