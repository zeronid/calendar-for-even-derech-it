import { Component, OnInit, Input } from '@angular/core';

const getNumberOfDays = () => {
  const date = new Date();
  let month = date.getMonth();
  let numberOfDays = 0;
  switch (month) {
    case 0:
    case 2:
    case 4:
    case 6:
    case 7:
    case 9:
    case 11:
      numberOfDays = 31
      break;
    case 1:
      numberOfDays = 28
      break;
    case 3:
    case 5:
    case 8:
    case 10:
      numberOfDays = 30
      break;
    default:
      break;
  }
  return numberOfDays;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  @Input() data: string[][] = [];
  numberOfDays: number = getNumberOfDays()
  titleOfCurrentData: string = "Open Price"
  selectedDay: string[] = []
  sortingOptions: string[] = ["None", "Low Price", "High Price", "Opening Price", "Closing Price"]
  filteredData: string[][] = []
  biggestDifferences: string[][] = []

  ngOnInit(): void {

  }

  setSelectedDay(value: any) {
    if (this.selectedDay === value) {
      this.selectedDay = []
    } else {
      this.selectedDay = value
    }
  }

  getBiggestDifference() {
    let dataCopy: string[][] = [...this.data]
    let threeBiggestDifferences: string[][] = []
    let currentBiggestIndex = 0
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < dataCopy.length; j++) {
        if (Math.abs((Number(dataCopy[j][2]) - Number(dataCopy[j][3]))) > Math.abs((Number(dataCopy[currentBiggestIndex][2]) - Number(dataCopy[currentBiggestIndex][3])))) {
          currentBiggestIndex = j
        }
      }
      threeBiggestDifferences.push(dataCopy[currentBiggestIndex])
      dataCopy = dataCopy.filter(e => e != dataCopy[currentBiggestIndex])
      currentBiggestIndex = 0
    }
    this.biggestDifferences = threeBiggestDifferences
  }

  filterData(e: any) {
    this.selectedDay = []
    this.biggestDifferences = []
    switch (e.target.value) {
      case "None":
        this.filteredData = []
        break;
      case "Low Price":
        this.filteredData = [...this.data].sort((a, b) => Number(a[3]) - Number(b[3]))
        this.filteredData.forEach((day, index) => {
          day = day.slice(0, 1).concat(day.slice(3, 4))
          this.filteredData[index] = day
        })
        break;
      case "High Price":
        this.filteredData = [...this.data].sort((a, b) => Number(b[2]) - Number(a[2]))
        this.filteredData.forEach((day, index) => {
          day = day.slice(0, 1).concat(day.slice(2, 3))
          this.filteredData[index] = day
        })
        break;
      case "Opening Price":
        this.filteredData = [...this.data].sort((a, b) => Number(b[1]) - Number(a[1]))
        this.filteredData.forEach((day, index) => {
          day = day.slice(0, 2)
          console.log(day)
          this.filteredData[index] = day
        })
        break;
      case "Closing Price":
        this.filteredData = [...this.data].sort((a, b) => Number(b[4]) - Number(a[4]))
        this.filteredData.forEach((day, index) => {
          day = day.slice(0, 1).concat(day.slice(4, 5))
          this.filteredData[index] = day
        })
        break;
      default:
        this.filteredData = [];
        break;
    }
  }

  getData(day: number) {
    if (this.data.length) {
      for (let i = 0; i < this.data.length; i++) {
        if (Number(this.data[i][0].substring(8, 10)) === day) {
          return this.data[i]
        }
      }
    }
    return []
  }
}
