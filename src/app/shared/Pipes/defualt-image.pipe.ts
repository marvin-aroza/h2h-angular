import { Pipe, PipeTransform } from '@angular/core';

//environment
import { environment } from 'src/environments/environment'

@Pipe({
  name: 'defualtImage'
})
export class DefualtImagePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    let imageLink = args[0];
    let returnLink = 'assets/img/nophoto.png';
    if(imageLink) {
      returnLink = environment.apiUrl+imageLink
    }

    return returnLink;
  }

}
