import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'incremental';
  counter = 0;
  incrementBy = 0;
  cost = {
    first: 0,
    second: 20,
    third: 400,
    fourth: 8000,
    fifth: 160000
  };

  ngOnInit() {
    this.increment();
  }

  increment(): void {
    setInterval(() => this.counter += (this.incrementBy / 10), 100);
  }

  makePurchase(value: number, cost: number) {
    this.increaseIncrement(value);
    this.subtractFromBalance(cost);
    this.increaseCost(cost);
  }

increaseIncrement(value: number): void {
  this.incrementBy += value;
}

  subtractFromBalance(cost: number): void {
    this.counter -= cost;
  }

  increaseCost(cost: number) {
    const stageToIncrease = Object.keys(this.cost).find(key => this.cost[key] === cost);
    this.cost[stageToIncrease] = this.cost[stageToIncrease] * 1.3;
  }
}
