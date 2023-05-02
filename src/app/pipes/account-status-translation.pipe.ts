import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'accountStatusTranslation',
})
export class AccountStatusTranslationPipe implements PipeTransform {
  transform(value: string): string {
    if (value === 'current') {
      return 'Courant';
    } else if (value === 'saving') {
      return 'Epargne';
    }
    return value;
  }
}
