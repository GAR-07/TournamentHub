import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NotificationMessage } from '../../models/notification-Мessage.model';

@Component({
  selector: 'app-notification',
  imports: [],
  templateUrl: './notification.html',
  styleUrls: ['./notification.scss']
})
export class Notification {
  @Input() notificationMessage!: NotificationMessage;
	@Output() isConfirmed: EventEmitter<boolean> = new EventEmitter<boolean>();

  type: string = 'error';

	ngOnInit(): void {
    console.log(this.notificationMessage.message, this.notificationMessage.status);

    if (typeof this.notificationMessage.message === "object") {
      this.notificationMessage.message = 'Непредвиденная ошибка';
      this.notificationMessage.status = 400;
    }

    if (this.notificationMessage.message === undefined) {
      this.notificationMessage.message = 'Ошибка подключения к серверу';
      this.notificationMessage.status = 404;
    }

    if (this.notificationMessage.message) {
      if (this.notificationMessage.message.includes('Error occurred while trying to proxy')) {
        this.notificationMessage.message = 'Ошибка подключения к серверу';
        this.notificationMessage.status = 404;
      }
    }

    if (this.notificationMessage.status === 403) {
      this.notificationMessage.message = 'Ошибка доступа';
    }

    if (this.notificationMessage.status >= 200 && this.notificationMessage.status <= 202) {
      this.type = 'success';
    } else if (this.notificationMessage.status >= 203 && this.notificationMessage.status <= 308) {
      this.type = 'info';
    } else {
      this.type = 'error';
    }
    
    setTimeout(() => {
      this.close();
    }, 5000);
  }
	
	close() {
		this.isConfirmed.emit(true);
	}
}
