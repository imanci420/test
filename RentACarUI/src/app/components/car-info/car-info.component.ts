import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Car } from "src/app/models/car.model";
import { City } from "src/app/models/city.model";
import { Mark } from "src/app/models/mark.model";
import { CarService } from "src/app/services/car.service";
import { CityService } from "src/app/services/city.service";
import { MarkService } from "src/app/services/mark.service";

@Component({
    templateUrl: './car-info.component.html',
    styleUrls:['./car-info.component.scss']
})
export class CarInfoComponent implements OnInit {
    public car: Car;
    public mark: Mark;
    public city: City;

    public constructor(private readonly _carService: CarService,      
        private readonly _markService: MarkService,
        private readonly _cityService: CityService,
        private readonly _route: ActivatedRoute){

    }

    public ngOnInit(): void {
        this.getCarById();
    }

    getCarById() {
        const id = Number(this._route.snapshot.paramMap.get('id'));
        this._carService.getCar(id)
          .subscribe(car => { 
              this.car = car 
              this._markService.getMark(car.markId).subscribe((mark) => {
                  this.mark = mark;
              })

              this._cityService.getCity(car.cityId).subscribe((city) => {
                this.city = city;
            })
        });
    }
}