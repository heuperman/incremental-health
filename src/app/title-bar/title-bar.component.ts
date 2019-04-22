import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title-bar',
  templateUrl: './title-bar.component.html'
})
export class TitleBarComponent {
  title = 'incremental health';

  constructor() { }

  @Input() score: number;
  @Input() stress: number;

}
