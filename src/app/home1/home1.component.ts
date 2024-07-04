import { Component } from '@angular/core';
import {Router,RouterOutlet} from '@angular/router'

@Component({
  selector: 'app-home1',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './home1.component.html',
  styleUrl: './home1.component.css'
})
export class Home1Component {
  constructor(private router:Router) {}

  navLogin() {
    this.router.navigateByUrl('login')
  }
}
