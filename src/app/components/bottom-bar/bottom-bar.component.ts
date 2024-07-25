import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-bottom-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bottom-bar.component.html',
  styleUrl: './bottom-bar.component.css'
})
export class BottomBarComponent {
  activeButton: string = 'home';

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.setActiveButton(event.urlAfterRedirects);
      }
    });
  }

  ngOnInit(): void {
    this.setActiveButton(this.router.url);
  }

  navigateTo(page: string): void {
    this.router.navigate([page]);
  }

  setActiveButton(url: string): void {
    const path = url.split('/')[1];
    this.activeButton = path ? path : 'home';
  }


}
