import { Manufacturer } from "./manufacturer";
import { CarDetail } from "./car-detail";

export class Car {
    id: number;
    carDetail?: CarDetail;
    manufacturer?: Manufacturer;
}