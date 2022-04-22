import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  data: string[][] = [];
  dataEndpoint = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo`;
  currentDate = new Date;

  constructor(private httpClient: HttpClient) {

  }

  ngOnInit(): void {
    this.getData()
  }
  getData() {
    this.httpClient.get<any>(this.dataEndpoint).subscribe(
      res => {
        this.data = Object.keys(res["Time Series (Daily)"]).map((item: string) => {
          return (
            [item]
          )
        }).filter((item: string[]) => {
          return (
            Number(item[0].substring(5, 7)) === this.currentDate.getMonth() + 1
          )
        })
        this.data.forEach((item: string[], index) => {
          item.push(res["Time Series (Daily)"][item[0]]["1. open"])
          item.push(res["Time Series (Daily)"][item[0]]["2. high"])
          item.push(res["Time Series (Daily)"][item[0]]["3. low"])
          item.push(res["Time Series (Daily)"][item[0]]["4. close"])
          item.push(res["Time Series (Daily)"][item[0]]["5. volume"])
        })
      }
    )
  }

}
