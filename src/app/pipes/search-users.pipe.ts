import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchUsers'
})
export class SearchUsersPipe implements PipeTransform {

  transform(values: any[], filter: string): any[] {
    if (!values || !values.length) { return []; }
    if (!filter) { return values; }

    return values.filter(v => {
        let match = false;

        Object.keys(v).forEach(k => {
            if (typeof v[k] === 'string') {
                match = match || v[k].toLowerCase().indexOf(filter.toLowerCase()) >= 0;
            } else {
                // tslint:disable-next-line: triple-equals
                match = match || v[k].toLowerCase() == filter.toLowerCase(); // == intentinally
            }
        });

        return match;
    });
}

}
