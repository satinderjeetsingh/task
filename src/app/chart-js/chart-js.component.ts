import { Component, OnInit } from '@angular/core';
import * as Chart  from 'chart.js';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-chart-js',
  templateUrl: './chart-js.component.html',
  styleUrls: ['./chart-js.component.css']
})
export class ChartJsComponent implements OnInit {
  public chart: any;

  constructor(private _task: TaskService) { }

  ngOnInit() {
    this._task.getData()
      .subscribe(res => {

        let value = res.map((res:any) => res.value)
        let date = res.map((res:any)=>res.date)
      
    this.chart = new Chart('canvas2', {
      type: 'bar',
      data: {
        labels: date ,
        datasets: [
          {
            data: value,
            backgroundColor : 'skyblue'            
          }
        ]
      },
      options: {
        legend: {
          display: false,
        },
        scales: {
          xAxes: [{stacked:true}],
          
          yAxes: [{stacked:true},
            { ticks: {beginAtZero:true}}]
        }
      }
    })
  })
  }

}
