import {Component, OnInit} from '@angular/core';
import { GameDataService } from '../game-data.service';
import { SelfCareService } from '../self-care.service';
import { SelfCare } from '../self-care';

@Component({
  selector: 'app-get-button',
  templateUrl: './self-care-list.component.html',
  styleUrls: ['./self-care-list.component.css']
})
export class SelfCareListComponent implements OnInit {
  selfCareStages: SelfCare[];
  timers: Record<string, number>;

  constructor(
    public gameDataService: GameDataService,
    private selfCareService: SelfCareService
  ) { }

  ngOnInit() {
    this.selfCareStages = this.selfCareService.getSelfCareStages();
    this.timers = {};
    for (const stage of this.selfCareStages) {
      this.timers[stage.title] = 0;
    }
  }

  stageUnlocked(stage: SelfCare): boolean {
    return stage.power === 1 || this.gameDataService.getPurchasedUpgrades().includes(stage.requiredUpgrade);
  }

  startCare(stage: SelfCare) {
    const interval = window.setInterval(() => {
      this.timers[stage.title] < 100 ? this.timers[stage.title] += stage.timerSpeed / 100 : this.finishCare(stage, interval);
      }, 10);
  }

  finishCare(stage: SelfCare, interval: number) {
    clearInterval(interval);
    setTimeout(() => {
      this.timers[stage.title] = 0;
      this.gameDataService.reduceStress(stage.power);
    }, 200);
  }

}
