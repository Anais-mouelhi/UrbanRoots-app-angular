import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { BottomBarComponent } from '../../components/bottom-bar/bottom-bar.component'


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, BottomBarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  authService= inject(AuthService);
  user: any = null;
  constructor(private router: Router) {}

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.user = {
        email: currentUser.email,
        username: currentUser.displayName,
        // Ajoutez d'autres propriétés si nécessaire
      };
    }
  }


  logout(): void {
    this.authService.logout(); 
    this.router.navigate(['']);
  
  }
  navigateToMap() {
    this.router.navigate(['/map']);
  }
  navigateToQuiz() {
    this.router.navigate(['/quiz']);
  }



 
}
