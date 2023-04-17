import { Component, ElementRef, ViewChild } from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  @ViewChild('myPieChart', { static: true })
  myPieChart!: ElementRef;
  public chart: any;
  product = [];

  constructor(){}
  ngOnInit(){
    // this.createChart();
   
  const chart = echarts.init(this.myPieChart.nativeElement);

  // Set chart options
  const options: echarts.EChartsOption = {
    title: {
      text: 'Patient Health Status',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Health Status',
        type: 'pie',
        radius: '70%',
        data: [
          { value: 2700, name: 'Low' , itemStyle: { color: 'lightgreen' }},
          { value: 1560, name: 'Medium' ,itemStyle: { color: 'yellow' }},
          { value: 580, name: 'High' , itemStyle: { color: 'orange' }},
          { value: 484, name: 'Severe' , itemStyle: { color: 'red' }},
        ],
        label: {
          formatter: '{d}%',
          position: 'inner'
        },
      }
    ]
  };

  // Set chart options and render
  chart.setOption(options);


  // this.prods.getWishProd();

  // setTimeout(()=>{
  //   this.product = this.prods.wishProd;
  // },1000)
  
  }
}
