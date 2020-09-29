import { Component, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  @Output() add = new EventEmitter();

  @Output() searchFilter = new EventEmitter<string>();

  filterText: string = "";
  
  addRecord() {
    this.add.emit();
  }
}
