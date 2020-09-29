import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Car } from 'src/domain/car';
import { CarDetail } from 'src/domain/car-detail';
import { CarDTO } from 'src/domain/carDTO';
import { Manufacturer } from 'src/domain/manufacturer';
import { Apiservice } from 'src/services/api.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.scss']
})
export class CarDetailComponent implements OnInit, OnDestroy {

  private routeSub: Subscription = {} as Subscription;
  private car: Car = {} as Car;

  id: number;

  constructor(private route: ActivatedRoute, private api: Apiservice) { 
    this.id = +this.route.snapshot.paramMap.get('id');
  }

    ngOnInit() {
      this.routeSub = combineLatest([this.api.getManufacturers(), this.api.getCarDetails(), this.api.getCars()]).subscribe((tmp => {   

        var carDTO = tmp[2].find(car => car.id == this.id);
        console.log("CarDTO: " + JSON.stringify(carDTO))

        this.car.id = carDTO.id;
        this.car.carDetail = tmp[1].find(c => c.id == carDTO.carDetailID);
        this.car.manufacturer = tmp[0].find(m => m.id == carDTO.manufacturerID);
        console.log("Car: " + JSON.stringify(this.car))}
        
      ), (error) => {
        console.log("Something wrong happened: " + JSON.stringify(error))
      })
    }

    ngOnDestroy() {
      this.routeSub.unsubscribe();
    }
}
