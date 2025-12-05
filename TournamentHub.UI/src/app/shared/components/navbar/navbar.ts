import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  @ViewChild('dropdown_wrapper') dropdownWrapper!: ElementRef;
  @ViewChild('dropdown_content') dropdownContent!: ElementRef;
  
  auth = inject(AuthService);

  logout(): void {
    this.auth.logout();
  }

  changeNavbarType(): void {
    const wrapperElement: HTMLElement = this.dropdownWrapper.nativeElement;
    const contentElement: HTMLElement = this.dropdownContent.nativeElement;

    if (wrapperElement.classList.contains('active')) {
      wrapperElement.classList.remove('active');
      contentElement.classList.remove('active');
    } else {
      wrapperElement.classList.add('active');
      contentElement.classList.add('active');
    }
  }
}
