import {Component, HostListener, OnInit} from '@angular/core';
import {GameDataService} from './services/game-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  burnout = false;

  constructor(
    private gameDataService: GameDataService,
  ) {}

  ngOnInit() {
    this.gameDataService.loadData();
    this.gameDataService.startProduction();
    this.gameDataService.checkAvailability();
    console.log(this.gameDataService.getStress());
    console.log(this.gameDataService.getStress() > 1000000);
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler() {
    this.gameDataService.saveData();
  }

}
