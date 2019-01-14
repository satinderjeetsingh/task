import { Component, OnInit } from '@angular/core';
import * as Chart  from 'chart.js';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-timeline-chart',
  templateUrl: './timeline-chart.component.html',
  styleUrls: ['./timeline-chart.component.css']
})
export class TimelineChartComponent implements OnInit {

  public chart: any;

  constructor(private _task: TaskService) { }

  ngOnInit() {
    this._task.getData()
      .subscribe(res => {

        let value = res.map((res:any) => res.value)
        let date = res.map((res:any)=>res.date)
      
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: date ,
        datasets: [
          {
            data: value,
            backgroundColor : 'red'            
          }
        ]
      },
      options: {
        legend: {
          display: false,
        },
        scales: {
          yAxes: [{ ticks: {beginAtZero:true}}]
        }
      }
    })
  })
  }

}
