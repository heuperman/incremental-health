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
  factoriesPurchased = [0];

  constructor(
    public factoryService: FactoryService,
    public countService: CountService
  ) {}

  ngOnInit() {
    this.factories = this.factoryService.getFactories();
  }

  makePurchase(title: string, production: number, price: number) {
    this.countService.subtractFromCount(price);
    this.factoryService.increasePrice(title);
    this.recordPurchase(production);
    this.countService.setProduction(this.getProduction());
  }

  recordPurchase(production: number) {
    const stageToIncrease = this.factories.findIndex(factory => factory.production === production);
    if (this.factoriesPurchased[stageToIncrease]) {
      this.factoriesPurchased[stageToIncrease] += 1;
    } else {
      this.factoriesPurchased[stageToIncrease] = 1;
    }
  }

  indexOfFactory(title: string): number {
    return this.factories.findIndex(factory => factory.title === title);
  }

  getProduction(): number {
    let totalProduction = 0;
    this.factoriesPurchased.forEach((purchased, index) => {
      totalProduction += purchased * this.factories[index].production;
    });
    return totalProduction;
  }

}
