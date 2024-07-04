import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    ValidationErrors,
    ValidatorFn,
} from '@angular/forms';
import { Validators } from '@angular/forms';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router } from '@angular/router';

function createPasswordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
          return null;
      }

      const hasUpperCase = /[A-Z]+/.test(value);
      const hasLowerCase = /[a-z]+/.test(value);
      const hasNumeric = /[0-9]+/.test(value);

      const passwordValid = hasUpperCase && hasLowerCase && hasNumeric;

      return !passwordValid ? { passwordStrength: true } : null;
  };
}

const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  return password === confirmPassword ? null : { PasswordNoMatch: true };
};

@Component({
  selector: 'app-update-pass',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule],
  templateUrl: './update-pass.component.html',
  styleUrl: './update-pass.component.css'
})
export class UpdatePassComponent implements OnInit{
  passwordForm: FormGroup;
    routeSubscription: any;
    email: any;

    constructor(private route:ActivatedRoute,private router:Router,private formBuilder: FormBuilder, private userService: ApiService) {
        this.passwordForm=this.formBuilder.group({
            u_name:'',
            password:''
    })
     }

     ngOnInit(): void {
        this.routeSubscription=this.route.queryParams.subscribe(params => {
            this.email = params['email'];
        this.passwordForm = this.formBuilder.group({
            email: [{value: this.email, disabled: true}, Validators.required],
            password: ['', [Validators.required, Validators.minLength(6), createPasswordStrengthValidator()]],
            confirmPassword: ['', Validators.required]
        }, { validators: confirmPasswordValidator });
    
      
    });}
    onSubmit(): void {
        if (this.passwordForm.valid) {
            const email = this.email;
            const password = this.passwordForm.value.password;

            this.userService.updatePassword1(email, password).subscribe(
                response => {
                    alert("Password Changed Successfully")
                    console.log('Password updated successfully');
                    this.router.navigate(['/rec-home'], { queryParams: { email: email }})
                },
                error => {
                    alert("Error updating Password(Please recheck your username)")
                    console.error('Failed to update password', error);
                }
            );
        }
    }
}
