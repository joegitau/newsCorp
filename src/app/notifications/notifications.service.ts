import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Command } from './shared/notification.schema';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  messages: Subject<Command>;

  constructor() {
    this.messages = new Subject<Command>();
  }

  addSuccess(message: string) {
    this.messages.next({
      id: this.randomId,
      type: 'success',
      text: message
    });
  }

  addError(message: string) {
    this.messages.next({
      id: this.randomId,
      type: 'error',
      text: message
    })
  }

  clearMessage(id: number) {
    this.messages.next({
      id,
      type: 'clear'
    });
  }

  private get randomId() {
    return Math.floor(Math.random() * 1000);
  }
}
