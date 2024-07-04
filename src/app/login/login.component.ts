import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router,RouterOutlet} from '@angular/router'
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../api.service';
import { AuthService } from '../../auth.service';
import { LoginService } from '../../login.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,RouterOutlet,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  isLogin1Visible = true;
  isLogin2Visible = false;

  login1() {
    this.isLogin1Visible = true;
    this.isLogin2Visible = false;
  }

  login2() {
    this.isLogin2Visible = true;
    this.isLogin1Visible = false;
  }
  
  loginForm1: FormGroup;
  loginForm2: FormGroup;
  constructor(private http:HttpClient,  private authService:AuthService ,private formBuilder: FormBuilder, private apiService: ApiService,private router:Router,private loginService:LoginService) {
    this.loginForm1 = this.formBuilder.group({
      em_id1:'',
      ps1:''
    });
    this.loginForm2 = this.formBuilder.group({
      em_id2:'',
      ps2:''
    });
  }
  loginUser() {
    if (this.loginForm1.valid) {
      this.apiService.loginUser(this.loginForm1.value).subscribe(
        (response: any) => {
          console.log("User Logged successfully", response);
          alert("User Logged successfully");
          this.authService.login();

          this.router.navigate(["/user-home"],{ queryParams: { email: this.loginForm1.value.em_id1 } });
          this.loginForm1.reset();
        },
        (error: any) => {
          console.error("Error Logging user", error);
          let errorMessage = "An error occurred. Please try again.";
          if (error.status === 404) {
            errorMessage = "User not found. Please check your email.";
          } else if (error.status === 401) {
            errorMessage = "Password incorrect. Please try again.";
          }
          alert(errorMessage);
          this.loginForm1.reset();
        }
      );
    } else {
      console.log("Form is invalid. Please check your inputs.");
      alert("Form is invalid. Please check your inputs.");
    }
  }
  loginRecru() {
    if (this.loginForm2.valid) {
      this.apiService.loginRecru(this.loginForm2.value).subscribe(
        (response: any) => {
          console.log("Recruiter Logged successfully", response);
          alert("Recruiter Logged successfully");
          this.authService.login();
          
          this.router.navigate(["/rec-home"],{ queryParams: { email: this.loginForm2.value.em_id2 } });
          this.loginForm2.reset();
        },
        (error: any) => {
          console.error("Error Logging user", error);
          let errorMessage = "An error occurred. Please try again.";
          if (error.status === 404) {
            errorMessage = "Recruiter not found. Please check your email.";
          } else if (error.status === 401) {
            errorMessage = "Password incorrect. Please try again.";
          }
          alert(errorMessage);
          this.loginForm2.reset();
        }
      );
    } else {
      console.log("Form is invalid. Please check your inputs.");
      alert("Form is invalid. Please check your inputs.");
    }
  }
}
