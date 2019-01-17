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
  factories: Factory[];
  upgrades: Upgrade[];
  factoriesPurchased = [0];

  constructor(
    public countService: CountService,
    public factoryService: FactoryService,
    public upgradeService: UpgradeService
  ) {}

  ngOnInit() {
    this.factories = this.factoryService.getFactories();
    this.upgrades = this.upgradeService.getUpgrades();
    this.countService.startProduction();
  }

  upgradeFactory(title: string, target: string, price: number, multiplier: number) {
    this.countService.subtractFromCount(price);
    this.factoryService.multiplyProduction(target, multiplier);
    this.setUpgradeToPurchased(title);
    this.countService.setProduction(this.getProduction());
  }

  setUpgradeToPurchased(title: string) {
    const targetUpgrade = this.upgrades.find(upgrade => upgrade.title === title);
    targetUpgrade.purchased = true;
  }

  getProduction(): number {
    let totalProduction = 0;
    this.factoriesPurchased.forEach((purchased, index) => {
      totalProduction += purchased * this.factories[index].production;
    });
    return totalProduction;
  }

}
