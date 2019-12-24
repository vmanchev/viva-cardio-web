import { Component, OnInit } from '@angular/core';
import { BloodPressureReading } from '../blood-pressure-reading.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  // fake data
  readings: BloodPressureReading[] = [
    { sys: 160, dia: 85, pulse: 52, created_at: '2019-01-13T12:43:18'}
  ];

  displayedColumns: string[] = ['created_at', 'sys', 'dia', 'pulse'];

  constructor() { }

  ngOnInit() {
  }

}
