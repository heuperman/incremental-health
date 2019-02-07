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
    console.log(this.timers);
  }

  stageUnlocked(stage: SelfCare): boolean {
    return this.gameDataService.getPurchasedUpgrades().includes(stage.requiredUpgrade);
  }

  startTimer(title: string, speed: number) {
    const interval = window.setInterval(() => {
      this.timers[title] < 100 ? this.timers[title] += speed : this.stopTimer(title, interval);
      }, 10);
  }

  stopTimer(title: string, interval: number) {
    clearInterval(interval);
    setTimeout(() => {
      this.timers[title] = 0;
    }, 400);
  }

}
