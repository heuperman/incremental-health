import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountService {
  private count = 0;
  private production = 0;
  constructor() { }

  startProduction() {
    setInterval(() => this.count += (this.production / 10), 100);
  }

  getCount() {
    return this.count;
  }

  subtractFromCount(price: number) {
    this.count -= price;
  }

  adToCount(amount: number) {
    this.count += amount;
  }

  setProduction(value: number) {
    this.production = value;
  }
}


