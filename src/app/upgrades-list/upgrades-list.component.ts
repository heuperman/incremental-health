import { Component, OnInit } from '@angular/core';
import {FactoryService} from '../factory.service';
import {UpgradeService} from '../upgrade.service';
import {CountService} from '../count.service';
import {Factory} from '../factory';
import {Upgrade} from '../upgrade';

@Component({
  selector: 'app-upgrades-list',
  templateUrl: './upgrades-list.component.html',
  styleUrls: ['./upgrades-list.component.css']
})
export class UpgradesListComponent implements OnInit {
  factories: Factory[];
  upgrades: Upgrade[];

  constructor(
    public countService: CountService,
    public factoryService: FactoryService,
    public upgradeService: UpgradeService
  ) {}

  ngOnInit() {
    this.factories = this.factoryService.getFactories();
    this.upgrades = this.upgradeService.getUpgrades();
  }

  upgradeAvailable(title: string, target: string, requiredLevel: number): boolean {
    const targetUpgrade = this.upgrades.find(upgrade => upgrade.title === title);
    return!targetUpgrade.purchased
      && this.countService.getCount() >= targetUpgrade.price
      && this.factoryService.getFactory(target).purchased >= requiredLevel;
  }

  upgradeFactory(title: string, target: string, price: number, multiplier: number) {
    this.countService.subtractFromCount(price);
    this.factoryService.multiplyProduction(target, multiplier);
    this.upgradeService.setUpgradeToPurchased(title);
    this.countService.updateProduction();
  }

}
