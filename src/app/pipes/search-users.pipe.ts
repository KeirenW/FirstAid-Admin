import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchUsers'
})
export class SearchUsersPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
