import { Component, OnInit } from '@angular/core';
import {CountService} from '../count.service';

@Component({
  selector: 'app-title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.css']
})
export class TitleBarComponent implements OnInit {
  title = 'incremental';

  constructor(public countService: CountService) { }

  ngOnInit() {
  }

}
