import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringChecker'
})
export class StringCheckerPipe implements PipeTransform {

  transform(value: unknown, ...args: any[]): any {
    let string:any = args[0];
    let returnString = string;
    if(args[1] == 'para') {
      if(string.length > 100) {
        console.log("isnide");
        let splitString = string.match(/.{1,100}/g);
        returnString = splitString[0]+'.......'
      }
    } else {
      if(string.length > 40) {
        let splitString = string.match(/.{1,30}/g);
        returnString = splitString[0]+'.......'
      }
    }


    return returnString;
  }

}
