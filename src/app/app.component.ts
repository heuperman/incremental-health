import {Component, OnInit} from '@angular/core';
import {CountService} from './count.service';
import {FactoryService} from './factory.service';
import {Factory} from './factory';
import {Upgrade} from './upgrade';
import {UpgradeService} from './upgrade.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  factoriesPurchased = [0];
  title = 'incremental';
  factories: Factory[];
  upgrades: Upgrade[];

  constructor(
    public countService: CountService,
    public factoryService: FactoryService,
    public upgradeService: UpgradeService) {}

  ngOnInit() {
    this.factories = this.factoryService.getFactories();
    this.upgrades = this.upgradeService.getUpgrades();
    this.countService.startProduction();
  }

  makePurchase(production: number, price: number) {
    this.countService.subtractFromCount(price);
    this.increasePrice(production);
    this.recordPurchase(production);
    this.countService.setProduction(this.getProduction());
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
    this.countService.subtractFromCount(price);
    this.multiplyProduction(target, multiplier);
    this.setUpgradeToPurchased(target);
    this.countService.setProduction(this.getProduction());
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
