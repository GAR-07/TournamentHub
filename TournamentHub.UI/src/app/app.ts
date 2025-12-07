import { Component, ElementRef, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./shared/components/navbar/navbar";
import { NotificationMessage } from './shared/models/notification-Мessage.model';
import { NotificationService } from './shared/services/notification-service';
import { Notification } from './shared/components/notification/notification';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Notification],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('TournamentHub');
  notificationMessages: NotificationMessage[] = [];

  constructor(
    private notificationService: NotificationService,
    private elem: ElementRef
  ) { }

  ngOnInit(): void {
    this.notificationService.notificationMessages$.subscribe(messages => {
      this.notificationMessages = messages;
    });

    var fontSize = localStorage.getItem('fontSize');
    const htmlElement = this.elem.nativeElement.ownerDocument.documentElement;
    htmlElement.style.fontSize = fontSize + 'px';
  }

  closeNotification(notificationMessage: NotificationMessage) {
    this.notificationService.removeNotification(notificationMessage);
  }
}
