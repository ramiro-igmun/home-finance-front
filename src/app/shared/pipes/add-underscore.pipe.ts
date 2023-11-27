import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceSpace'
})
export class ReplaceSpacePipe implements PipeTransform {

  transform(value: string, replacement: string = '_', substring: string = ' '): string {
    const regex = new RegExp(substring, 'g')
    return value.replace(regex, replacement);
  }

}
