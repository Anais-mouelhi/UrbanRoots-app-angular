import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-interactive-guide',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './interactive-guide.component.html',
  styleUrl: './interactive-guide.component.css'
})
export class InteractiveGuideComponent {

  constructor(private router: Router) { }

  goToQuiz(): void {
    this.router.navigate(['/quiz']);
  }

}
