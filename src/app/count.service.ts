import { Injectable } from '@angular/core';
import {FactoryService} from './factory.service';

@Injectable({
  providedIn: 'root'
})
export class CountService {
  private count = 0;
  private production = 0;
  private intervalId: number;
  constructor(private factoryService: FactoryService) { }

  getCount() {
    return this.count;
  }

  subtractFromCount(price: number) {
    this.count -= price;
  }

  addToCount(amount: number) {
    this.count += amount;
  }

  updateProduction() {
    clearInterval(this.intervalId);
    this.production = this.getProduction();
    this.intervalId = setInterval(() => this.count += (this.production / 10), 100);
  }

  getProduction(): number {
    let totalProduction = 0;
    for (const factory of this.factoryService.getFactories()) {
      totalProduction += factory.baseProduction;
    }
    return totalProduction;
  }
}


