import { Component, OnInit } from '@angular/core';
import {Factory} from '../factory';
import {FactoryService} from '../factory.service';
import {CountService} from '../count.service';

@Component({
  selector: 'app-factories-list',
  templateUrl: './factories-list.component.html',
  styleUrls: ['./factories-list.component.css']
})
export class FactoriesListComponent implements OnInit {
  factories: Factory[];

  constructor(
    public factoryService: FactoryService,
    public countService: CountService
  ) {}

  ngOnInit() {
    this.factories = this.factoryService.getFactories();
  }

  makePurchase(title: string, production: number, price: number) {
    this.countService.subtractFromCount(price);
    this.factoryService.recordPurchase(title);
    this.countService.updateProduction();
  }

}
