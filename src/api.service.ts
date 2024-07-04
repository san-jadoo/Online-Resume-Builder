import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})

export class ApiService {
    private baseUrl = "http://localhost:4000";

    constructor(private httpClient: HttpClient) { }

    registerUser(userDetails: any) {
        return this.httpClient.post(`${this.baseUrl}/user-register`, userDetails);
    }
    loginUser(userDetails: any) {
        return this.httpClient.post(`${this.baseUrl}/loginUser`, userDetails);
    }
    loginRecru(userDetails: any) {
        return this.httpClient.post(`${this.baseUrl}/loginRecru`, userDetails);
    }
    resumeData(userDetails: any) {
        return this.httpClient.post(`${this.baseUrl}/resume-data`, userDetails);
    }
    postJobDet(userDetails: any) {
        return this.httpClient.post(`${this.baseUrl}/post-jobdet`, userDetails);
    }
    postResDet(userDetails: any) {
        return this.httpClient.post(`${this.baseUrl}/post-resdet`, userDetails);
    }
    createResume(userDetails: any) {
        return this.httpClient.post(`${this.baseUrl}/res-details`, userDetails);
    }
    getResumeData(email: string): Observable<any[]> {
        return this.httpClient.get<any[]>(`${this.baseUrl}/res-data?email=${email}`);
    }
    updatePassword1(email: string, newPassword: string) {
        // Assuming your API endpoint for updating password is '/api/updatePassword'
        return this.httpClient.post('http://localhost:4000/updatepassword', { email, newPassword });
      }
      remove(id: string): Observable<any> {
        return this.httpClient.delete<any>(`${this.baseUrl}/remove/${id}`);
      }
}