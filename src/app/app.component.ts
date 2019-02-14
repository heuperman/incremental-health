import {Component, HostListener, OnInit} from '@angular/core';
import {GameDataService} from './services/game-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(
    private gameDataService: GameDataService,
  ) {}

  ngOnInit() {
    this.gameDataService.loadData();
    this.gameDataService.startProduction();
    this.gameDataService.checkAvailability();
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler() {
    this.gameDataService.saveData();
  }

}
