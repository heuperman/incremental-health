import {Component, HostListener, OnInit} from '@angular/core';
import {GameDataService} from './game-data.service';
import {UpgradeService} from './upgrade.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private gameDataService: GameDataService, private upgradeService: UpgradeService) {
  }

  ngOnInit() {
    this.gameDataService.loadData();
    this.gameDataService.updateProduction();
    this.upgradeService.checkAvailability();
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler() {
    this.gameDataService.saveData();
  }

}
