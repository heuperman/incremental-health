import {Component, HostListener, OnInit} from '@angular/core';
import {GameDataService} from './services/game-data.service';
import {MatDialog} from '@angular/material';
import {VictoryDialogComponent} from './victory-dialog/victory-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(
    private gameDataService: GameDataService,
    public dialog: MatDialog
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

  isBurnout(): boolean {
    this.gameDataService.burnout = this.gameDataService.getStress() > 1000000;
    return this.gameDataService.getStress() > 1000000;
  }

  victoryDialog() {
    this.dialog.open(VictoryDialogComponent, {
      height: 'auto',
      width: 'auto',
      autoFocus: false
    });
  }
}
