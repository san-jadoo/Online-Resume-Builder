import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'; 
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home2',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './home2.component.html',
  styleUrl: './home2.component.css'
})
export class Home2Component implements OnInit{
  uploadForm: FormGroup;
  email: string = '';
  private routeSubscription: Subscription | null = null;
  constructor(
    private http: HttpClient,
    private router: Router,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private authService:AuthService
  ) {
    this.uploadForm = this.formBuilder.group({
      file: ['']
    });
  }
  navigateTo(route: string) {
    this.router.navigateByUrl(route);
    this.authService.logout();
  }
  navigateTorf(route:string,email:string)
  {
    this.router.navigate([route],{ queryParams: { email: email}})
  }
  navigateTovj(route:string,email:string)
  {
    this.router.navigate([route],{ queryParams: { email: email}})
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
}
