import { Component, NgZone } from '@angular/core';
import * as Charts from '@amcharts/amcharts4/charts';
import * as Core from '@amcharts/amcharts4/core';
import { TaskService } from '../task.service';


@Component({
  selector: 'app-am-chart',
  template: `<hr>
  <h2 style="text-align: center">AmChart</h2>
  <div id="chartdiv" style="width: 90%; height: 600px;"></div>
  `,
  styles: []
})
export class AmChartComponent  {
  private chart : Charts.XYChart;

  constructor(private _zone: NgZone, private _task: TaskService){}
  
  ngOnInit(){
    this._zone.runOutsideAngular(() =>{

      let chart = Core.create("chartdiv", Charts.XYChart);
      
      this._task.getData()
      .subscribe(res => {let data = res

          chart.data = data;
          //hart.dataSource.url = "https://us-central1-eduwaivecommon.cloudfunctions.net/getTimeLineData";
          //chart.dataSource.parser = new Core.JSONParser;   
          //chart.dataSource.load();

          let dateAxis = chart.xAxes.push(new Charts.DateAxis());
          //dateAxis.renderer.grid.template.location = 0;
    
          let valueAxis = chart.yAxes.push(new Charts.ValueAxis());
          valueAxis.tooltip.disabled = false;
    
          let series = chart.series.push(new Charts.ColumnSeries());
          series.dataFields.dateX = "date";
          series.dataFields.valueY = "value";
    
          series.tooltipText = "{valueY.value}";
          chart.cursor = new Charts.XYCursor();
    
          //let scrollbarX = new Charts.XYChartScrollbar();
          //scrollbarX.series.push(series);
          //chart.scrollbarX = scrollbarX;


          this.chart = chart;
           
    });})
  }
      ngOnDestroy() {
        this._zone.runOutsideAngular(()=>{
          if(this.chart){
            this.chart.dispose();
          }
        })
      }

}
