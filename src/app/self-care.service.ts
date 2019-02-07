import { Injectable } from '@angular/core';
import { SelfCare } from './self-care';

@Injectable({
  providedIn: 'root'
})
export class SelfCareService {

  constructor() { }

  selfCareStages: SelfCare[] = [
    {title: 'take a deep breath', power: 1, buttonText: 'in... and out', requiredUpgrade: 0, timerSpeed: 1},
    {title: 'drink some tea', power: 10, buttonText: 'lovely', requiredUpgrade: 1, timerSpeed: 0.6},
    {title: 'have a bath', power: 100, buttonText: 'splash', requiredUpgrade: 2, timerSpeed: 0.3},
    {title: 'get a massage', power: 1000, buttonText: 'lay down and relax', requiredUpgrade: 3, timerSpeed: 0.1},
    {title: 'go on spa retreat', power: 1E4, buttonText: 'leave it all behind', requiredUpgrade: 4,  timerSpeed: 0.04}
  ];

  getSelfCareStages(): SelfCare[] {
    return this.selfCareStages;
  }
}


