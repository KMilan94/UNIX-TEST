import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apiservice } from 'src/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = []

  constructor(private api: Apiservice) {}

  ngOnInit() {
    this.subscriptions = [
      this.api.getCars().subscribe((cars) => {
        console.log("ReS: " + JSON.stringify(cars));
      })
    ]
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
