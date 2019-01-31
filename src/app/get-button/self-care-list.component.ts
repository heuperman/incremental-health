import { Component, OnInit } from '@angular/core';
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

  constructor(
    public gameDataService: GameDataService,
    private selfCareService: SelfCareService
  ) {}

  ngOnInit() {
    this.selfCareStages = this.selfCareService.getSelfCareStages();
  }

  stageUnlocked(stage: SelfCare): boolean {
    return this.gameDataService.getPurchasedUpgrades().includes(stage.requiredUpgrade);
  }

}
