import { Component, OnInit } from '@angular/core';
import { GameDataService } from '../services/game-data.service';
import { SelfCareService } from '../services/self-care.service';
import { SelfCare } from '../interfaces/self-care';

@Component({
  selector: 'app-selfcare-list',
  templateUrl: './self-care-list.component.html'
})
export class SelfCareListComponent implements OnInit {
  selfCareStages: SelfCare[];
  timers: Record<string, number>;
  timeOut = 10;
  increment = 100;

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
    if (navigator.userAgent.search('Firefox') > -1) {
      this.timeOut = 100;
      this.increment = 10;
    }
  }

  stageUnlocked(stage: SelfCare): boolean {
    return stage.power === 1 || this.gameDataService.getUpgradesPurchased().includes(stage.requiredUpgrade);
  }

  startCare(stage: SelfCare) {
    const interval = window.setInterval(() => {
      this.timers[stage.title] < 100 ? this.timers[stage.title] += stage.timerSpeed / this.increment : this.finishCare(stage, interval);
      }, this.timeOut);
  }

  finishCare(stage: SelfCare, interval: number) {
    clearInterval(interval);
    setTimeout(() => {
      this.timers[stage.title] = 0;
      this.gameDataService.reduceStress(stage.power);
    }, 200);
  }

}
