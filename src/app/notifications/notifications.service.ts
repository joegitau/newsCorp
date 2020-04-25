import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { scan } from 'rxjs/operators';

import { Command } from './shared/notification.schema';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  messagesInput: Subject<Command>;
  messagesOutput: Observable<Command[]>;

  constructor() {
    this.messagesInput = new Subject<Command>();

    this.messagesOutput = this.messagesInput
      .pipe(
        scan((acc: Command[], value: Command) => {
          if (value.type === 'success' || value.type === 'error') {
            return [...acc, value];
          } else if (value.type === 'clear') {
            return acc.filter(msg => msg.id !== value.id);
          }
        }, [])
      );
  }

  addSuccess(message: string): void {
    this.messagesInput.next({
      id: this.randomId,
      type: 'success',
      text: message
    });
  }

  addError(message: string): void {
    this.messagesInput.next({
      id: this.randomId,
      type: 'error',
      text: message
    })
  }

  clearMessage(id: number): void {
    this.messagesInput.next({
      id,
      type: 'clear'
    });
  }

  private get randomId(): number {
    return Math.floor(Math.random() * 1000);
  }
}
