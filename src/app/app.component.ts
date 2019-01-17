import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'incremental';
  counter = 0;
  totalProduction = 0;
  factories = [
    {title: 'first', production: 1, price: 1},
    {title: 'second', production: 10, price: 20},
    {title: 'third', production: 100, price: 400},
    {title: 'fourth', production: 1000, price: 8000},
    {title: 'fifth', production: 10000, price: 160000}
    ];

  ngOnInit() {
    this.increment();
  }

  increment(): void {
    setInterval(() => this.counter += (this.totalProduction / 10), 100);
  }

  makePurchase(production: number, price: number) {
    this.increaseProductionRate(production);
    this.subtractFromBalance(price);
    this.increasePrice(production);
  }

  increaseProductionRate(production: number): void {
    this.totalProduction += production;
  }

  subtractFromBalance(price: number): void {
    this.counter -= price;
  }

  increasePrice(production: number): void {
    const stageToIncrease = this.factories.findIndex(factory => factory.production === production);
    this.factories[stageToIncrease].price *= 1.3;
  }

}
