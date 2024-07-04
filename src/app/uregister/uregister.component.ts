import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router,RouterOutlet} from '@angular/router'
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { ApiService } from '../../api.service';
import { AuthService } from '../../auth.service';
import { FormsModule } from '@angular/forms';

export function passwordStrengthValidator(minLength: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const password = control.value;
    if (!password || password.length < minLength) {
      return { 'passwordStrength': { requiredLength: minLength, actualLength: password ? password.length : 0 } };
    }

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);

    if (!(hasUpperCase && hasLowerCase && hasDigit && hasSpecialChar)) {
      return { 'passwordStrength': true };
    }

    return null;
  };
}

@Component({
  selector: 'app-uregister',
  standalone: true,
  imports: [CommonModule,RouterOutlet,ReactiveFormsModule],
  templateUrl: './uregister.component.html',
  styleUrl: './uregister.component.css'
})
export class UregisterComponent {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService,private router:Router) {
      this.registerForm = this.formBuilder.group({
        uname: [''],
        ps: [''],
        cps: [''],
        ph: [''],
        em_id: [''],
    });
  }


  registerUser(){
    if (this.validateForm()){
      if (!this.isValidPhoneNumber()) {
        alert('Please enter a valid phone number.');
        return;
      }
      else if (!this.isValidEmail()) {
        alert('Please enter a valid email address ending with @gmail.com.');
        return;
      }
      else if(!this.validatePassword(this.registerForm.value.ps)){
        alert('Password must contain at least one uppercase letter, one lowercase letter, one digit, one special character, and be at least 8 characters long.');
      }
      else if (this.registerForm.value.ps !== this.registerForm.value.cps) {
        alert('Password and confirm password do not match.');
        return;
      }
      else{
      this.apiService.registerUser(this.registerForm.value).subscribe(
        response => {
          console.log("User registered successfully", response);
          alert("User registered successfully");
          this.router.navigateByUrl('/login')
        },
        error => {
          console.error("Error registering user", error);
          alert("Error registering user");
          this.registerForm.reset();
        }
      );
    } 
    }
    else {
      alert('Please fill in all fields.');
    }
  }
  validateForm(): boolean {
    return (
      this.registerForm.value.uname &&
      this.registerForm.value.em_id &&
      this.registerForm.value.ph &&
      this.registerForm.value.ps &&
      this.registerForm.value.cps
    );
  }
  isValidPhoneNumber(): boolean {
    const phoneNumberRegex = /^\d{10}$/;
    return phoneNumberRegex.test(this.registerForm.value.ph);
  }

  isValidEmail(): boolean {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(this.registerForm.value.em_id) && this.registerForm.value.em_id.endsWith('@gmail.com');
  }

  validatePassword(password: string): boolean {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);
    const minLength = password.length >= 8;
  
    if (!(hasUpperCase && hasLowerCase && hasDigit && hasSpecialChar && minLength)) {
      return false;
    }
  
    return true;
  }

}