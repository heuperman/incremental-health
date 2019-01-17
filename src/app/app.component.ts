import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  factoriesPurchased = [0];
  title = 'incremental';
  counter = 0;
  factories = [
    {title: 'first', production: 1, price: 1, purchased: 0},
    {title: 'second', production: 10, price: 20, purchased: 0},
    {title: 'third', production: 100, price: 400, purchased: 0},
    {title: 'fourth', production: 1000, price: 8000, purchased: 0},
    {title: 'fifth', production: 10000, price: 160000, purchased: 0}
    ];
  upgrades = [
    {title: 'double first', target: 0, multiplier: 2, price: 10, purchased: false, requiredLevel: 10},
    {title: 'double second', target: 1, multiplier: 2, price: 200, purchased: false, requiredLevel: 10},
    {title: 'double third', target: 2, multiplier: 2, price: 4000, purchased: false, requiredLevel: 10},
    {title: 'double fourth', target: 3, multiplier: 2, price: 80000, purchased: false, requiredLevel: 10},
    {title: 'double fifth', target: 4, multiplier: 2, price: 1600000, purchased: false, requiredLevel: 10},
    {title: 'double first', target: 0, multiplier: 2, price: 1000, purchased: false, requiredLevel: 25},
    {title: 'double second', target: 1, multiplier: 2, price: 20000, purchased: false, requiredLevel: 25},
    {title: 'double third', target: 2, multiplier: 2, price: 400000, purchased: false, requiredLevel: 25},
    {title: 'double fourth', target: 3, multiplier: 2, price: 8000000, purchased: false, requiredLevel: 25},
    {title: 'double fifth', target: 4, multiplier: 2, price: 160000000, purchased: false, requiredLevel: 25}
  ];

  ngOnInit() {
    setInterval(() => this.counter += (this.getProduction() / 10), 100);
  }

  makePurchase(production: number, price: number) {
    this.subtractFromBalance(price);
    this.increasePrice(production);
    this.recordPurchase(production);
  }

  subtractFromBalance(price: number): void {
    this.counter -= price;
  }

  increasePrice(production: number): void {
    const stageToIncrease = this.factories.findIndex(factory => factory.production === production);
    this.factories[stageToIncrease].price *= 1.3;
  }

  recordPurchase(production: number) {
    const stageToIncrease = this.factories.findIndex(factory => factory.production === production);
    if (this.factoriesPurchased[stageToIncrease]) {
      this.factoriesPurchased[stageToIncrease] += 1;
    } else {
      this.factoriesPurchased[stageToIncrease] = 1;
    }
  }

  upgradeFactory(target: number, price: number, multiplier: number) {
    this.subtractFromBalance(price);
    this.multiplyProduction(target, multiplier);
    this.setUpgradeToPurchased(target);
  }

  multiplyProduction(target: number, multiplier: number) {
    this.factories[target].production *= multiplier;
  }

  setUpgradeToPurchased(target: number) {
    this.upgrades[target].purchased = true;
  }

  getProduction(): number {
    let totalProduction = 0;
    this.factoriesPurchased.forEach((purchased, index) => {
      totalProduction += purchased * this.factories[index].production;
    });
    return totalProduction;
  }

  indexOfFactory(title: string): number {
    return this.factories.findIndex(factory => factory.title === title);
  }

}
