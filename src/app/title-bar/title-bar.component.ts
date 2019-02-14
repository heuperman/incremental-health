import {Component, OnInit} from '@angular/core';
import { GameDataService } from '../services/game-data.service';

@Component({
  selector: 'app-title-bar',
  templateUrl: './title-bar.component.html'
})
export class TitleBarComponent implements OnInit {
  title = 'incremental health';

  constructor(public gameDataService: GameDataService) { }

  ngOnInit() {
  }

}
