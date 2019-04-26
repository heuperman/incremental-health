import { Injectable } from '@angular/core';
import { SelfCare } from '../interfaces/self-care';

@Injectable({
  providedIn: 'root'
})
export class SelfCareService {

  constructor() { }

  selfCareStages: SelfCare[] = [
    {title: 'take a deep breath', power: 1, buttonText: 'in... and out', requiredUpgrade: 0, timerSpeed: 100},
    {title: 'drink some tea', power: 10, buttonText: 'lovely', requiredUpgrade: 1, timerSpeed: 50},
    {title: 'have a bath', power: 100, buttonText: 'splash', requiredUpgrade: 2, timerSpeed: 25},
    {title: 'get a massage', power: 1000, buttonText: 'lay down and relax', requiredUpgrade: 3, timerSpeed: 12.5},
    {title: 'hug your pet', power: 1E4, buttonText: 'so soft', requiredUpgrade: 4,  timerSpeed: 6.25},
    {title: 'go on spa retreat', power: 1E5, buttonText: 'leave it all behind', requiredUpgrade: 5,  timerSpeed: 3.125}
  ];

  getSelfCareStages(): SelfCare[] {
    return this.selfCareStages;
  }
}
