import { Pipe, PipeTransform } from '@angular/core';
import { Restoran } from '../interfaces/restoran';

@Pipe({
  name: 'sortRestorani',
  standalone: false
})
export class SortRestoraniPipe implements PipeTransform {

  transform(restorani: Restoran[], order: 'asc' | 'desc' = 'asc'): Restoran[] {
    return restorani.sort((a, b) => {
      const comparison = a.imeRestorana.localeCompare(b.imeRestorana);
      return order === 'asc' ? comparison : -comparison;
    });
      
  }

}
