// login.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private userName = new BehaviorSubject<string>('');

  setuserName(name: string) {
    this.userName.next(name);
  }

  getuserName() {
    return this.userName.asObservable();
  }
}
