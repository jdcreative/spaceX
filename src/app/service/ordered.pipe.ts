import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'orderBy'
})

export class ArraySortPipe implements PipeTransform {
    transform(array: Array<any>): Array<string> {
        array.sort((a: any, b: any) => {
            if (b.value > a.value) {
                return -1;
            } else if (b.value < a.value) {
                return 1;
            } else {
                return 0;
            }
        });
        array.reverse();
        return array;
    }




}