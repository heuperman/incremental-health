import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelfCareService {

  constructor() { }

  selfCareStages = [
    {title: 'take a deep breath', power: 1, buttonText: 'in... and out'},
    {title: 'drink some tea', power: 10, buttonText: 'lovely'},
    {title: 'have a bath', power: 100, buttonText: 'splash'},
    {title: 'get a massage', power: 1000, buttonText: 'lay down and relax'},
    {title: 'go on spa retreat', power: 1E4, buttonText: 'leave it all behind'}
  ];

  getSelfCareStages(): any {
    return this.selfCareStages;
  }
}


