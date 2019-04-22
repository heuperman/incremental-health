import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-title-bar',
  templateUrl: './title-bar.component.html'
})
export class TitleBarComponent implements OnInit{
  title = 'incremental health';

  constructor() { }

  @Input() score: number;
  @Input() stress: number;

  ngOnInit(): void {
    console.log(this.score);
  }

}
