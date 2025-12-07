import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NotificationMessage } from '../models/notification-Мessage.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationMessagesSubject: BehaviorSubject<NotificationMessage[]> = new BehaviorSubject<NotificationMessage[]>([]);
  public notificationMessages$: Observable<NotificationMessage[]> = this.notificationMessagesSubject.asObservable();

  constructor() { }

  addMessage(message: NotificationMessage) {
    const currentMessages = this.notificationMessagesSubject.getValue();
    const updatedMessages = [...currentMessages, message];
    this.notificationMessagesSubject.next(updatedMessages);
  }

  removeNotification(message: NotificationMessage) {
    const currentMessages = this.notificationMessagesSubject.getValue();
    const updatedMessages = currentMessages.filter(msg => msg.id !== message.id);
    this.notificationMessagesSubject.next(updatedMessages);
  }
}
