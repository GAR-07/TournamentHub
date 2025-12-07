import { v4 as uuidv4 } from 'uuid';

export class NotificationMessage {
  id: string;
  message: string;
  status: number;

  constructor(message: string, status?: number) {
    this.id = uuidv4();
    this.message = message;
    this.status = status !== undefined ? status : 200;
  }
}