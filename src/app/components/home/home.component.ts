import { Component, OnInit } from '@angular/core';
import { CoronaService } from 'src/app/service/corona.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private coronaService: CoronaService) {}
  globalData = [];
  countriesData = [];
  ngOnInit(): void {
    this.coronaService.getSummary().subscribe((data) => {
      this.globalData = data.Global;
      this.countriesData = data.Countries;

      // console.log(this.globalData);
    });
  }
}
