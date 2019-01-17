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

}
