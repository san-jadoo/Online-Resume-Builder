import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../api.service';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-resume-preview',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './resume-preview.component.html',
  styleUrl: './resume-preview.component.css'
})
export class ResumePreviewComponent implements OnInit{
  resumeData: any[] = []; 
  title = 'Resume-Creator';
  email: string='';
  generatePDF() {
    const elementToPrint = document.getElementById('thecontent');
    if (elementToPrint) {
      html2canvas(elementToPrint, { scale: 2 }).then((canvas) => {
        const pdf = new jsPDF();
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 211, 298);
        pdf.setProperties({
          title: 'My Resume',
          subject: 'PDF from HTML in Angular',
          author: 'SaNjAy JaDoO'
        });
        pdf.setFontSize(12);
        //pdf.text('SaNjAy JaDoO', 14, 22);
        pdf.save('myResume.pdf');
      });
    } else {
      console.error('Element not found');
    }
  }
  private routeSubscription: Subscription | null = null;
  constructor(
    private http: HttpClient,
    private router: Router,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private authService:AuthService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
     // alert(" 1 "+this.email);
      this.loadresumedata(this.email);
    });
  }
  navigateToot(route:string,email:string)
  {
    this.router.navigate([route],{ queryParams: { email: email}})
  }

  loadresumedata(emaill:string) {
   // alert(" 2 "+this.email);
    this.apiService.getResumeData(this.email)
      .subscribe((resd: any[]) => {
        console.log(resd);
        this.resumeData = resd;
        /*if (this.questions.length === 0) {
          alert('No quizzes assigned.');
          this.router.navigate(['/homeStud'], { queryParams: { u_name: this.username } });
        }*/
      });
}
}
