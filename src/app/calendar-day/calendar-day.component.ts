import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.css']
})
export class CalendarDayComponent implements OnInit {
  @Input() data: string[] = []
  @Input() selectedDiv: string[] = []
  @Input() filtered: boolean = false
  @Input() biggestDifferences: string[][] = []
  @Output() updateFullData = new EventEmitter<string[]>();
  @ViewChild('container') container: any;
  currentDataChoice: number = 0
  currentDataChoiceTitle: string[] = ['Open', 'High', 'Low', 'Close']

  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges) {
    this.biggestDifferences.map((diff, index) => {
      if (this.data.length && JSON.stringify(diff) === JSON.stringify(this.data)) {
        this.container.nativeElement.classList.add('selected')
      }
    })
  }

  divClicked(div: any) {
    if (!this.filtered) {
      this.updateFullData.emit(this.data);
      let days = document.getElementsByClassName("yes-data")
      Array.from(days).forEach(day => {
        day.classList.remove('selectedDiv')
      })
      if (this.selectedDiv !== this.data) {
        div.classList.add('selectedDiv')
      }
    }
  }

  changeData(val: any) {
    switch (val.target.value) {
      case "Open":
        this.currentDataChoice = 0;
        break;
      case "High":
        this.currentDataChoice = 1;
        break;
      case "Low":
        this.currentDataChoice = 2;
        break;
      case "Close":
        this.currentDataChoice = 3;
        break;
      default:
        break;
    }
  }

  selectClicked(e: any) {
    e.stopPropagation();
  }
}
