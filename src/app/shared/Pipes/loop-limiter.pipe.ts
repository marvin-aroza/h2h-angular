import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'loopLimiter'
})
export class LoopLimiterPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    //args 1 will be array and arg 2 will be the slice value
    let array = args[0]
    return array.slice(0,args[1]);
  }

}
