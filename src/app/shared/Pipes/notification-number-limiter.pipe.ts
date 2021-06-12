import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'notificationNumberLimiter'
})
export class NotificationNumberLimiterPipe implements PipeTransform {

  transform(value: unknown, ...args: any[]): unknown {
    let displayText;
    if(args[0] > args[1]) {
      displayText = args[1]+'+'
    } else {
      displayText = args[0]
    }
    return displayText;
  }

}
