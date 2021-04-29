import { Component, OnInit } from '@angular/core';
import { CoronaService } from 'src/app/service/corona.service';
@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css'],
})
export class CountriesComponent implements OnInit {
  constructor(private coronaService: CoronaService) {}
  countries: any;
  country: any;
  Confirmed: number;
  Recovered: number;
  deaths: number;
  ngOnInit(): void {
    this.coronaService.getCountriesData().subscribe((data) => {
      this.countries = data;
    });
  }
  getCountry(country) {
    this.country = country;
  }
  getCoronaData() {
    // alert(this.country);
    this.coronaService.getCoronaData(this.country).subscribe((data) => {
      let index = data.length - 1;
      // console.log(index);

      this.Confirmed = data[index].Confirmed;
      this.Recovered = data[index].Recovered;
      this.deaths = data[index].Deaths;
    });
  }
}
