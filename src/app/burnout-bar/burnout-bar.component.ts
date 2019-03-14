import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-burnout-bar',
  templateUrl: './burnout-bar.component.html'
})
export class BurnoutBarComponent implements OnInit {

  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
  }

  isMobile(): boolean {
    return this.breakpointObserver.isMatched('(max-width: 599px)');
  }
}
