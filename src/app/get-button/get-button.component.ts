import { Component, OnInit } from '@angular/core';
import {CountService} from '../count.service';

@Component({
  selector: 'app-get-button',
  templateUrl: './get-button.component.html',
  styleUrls: ['./get-button.component.css']
})
export class GetButtonComponent implements OnInit {
  constructor(public countService: CountService) { }

  ngOnInit() {
  }

}
