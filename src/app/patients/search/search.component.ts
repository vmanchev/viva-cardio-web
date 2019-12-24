import { Component, OnInit } from "@angular/core";
import { Patient } from '../patient.model';

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"]
})
export class SearchComponent implements OnInit {
  // fake data
  patients: Patient[] = [
    { id: 1, name: 'Иван Иванов' },
    { id: 2, name: 'Петър Димитров' },
  ];

  displayedColumns: string[] = ["name"];

  constructor() {}

  ngOnInit() {}
}
