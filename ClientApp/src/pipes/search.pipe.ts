import { Pipe, PipeTransform } from "@angular/core";
import { Car } from "src/domain/car";

@Pipe({
    name: 'filterPipe'
  })
  export class FilterPipe implements PipeTransform {
  
    transform(list: Car[], filterText: string): any {
      return true;
      // return list ? list.filter(item => item.carDetail.model.search(new RegExp(filterText, 'i')) > -1) : [];
    }
  
}