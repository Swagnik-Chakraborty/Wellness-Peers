import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as echarts from 'echarts';
import { PatientService } from '../services/patient.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  @ViewChild('myPieChart', { static: true })
  myPieChart!: ElementRef;

  public chart: any;
  pieChartData!: any;
  topTenPatientData!: any;
  product = [];

  constructor(private router: Router, private patientService: PatientService) {}
  ngOnInit() {
    this.patientService.getTopTenPatientData().subscribe(res=>{
      this.topTenPatientData=res;
      console.log(res);
    })
    this.createChart();
  const chart = echarts.init(this.myPieChart.nativeElement);
    this.patientService.getPieChartData().subscribe((res) => {
      // this.createChart();

      const chart = echarts.init(this.myPieChart.nativeElement);

      // Set chart options
      const options: echarts.EChartsOption = {
        title: {
          text: 'Patient Health Status',
          left: 'center',
        },
        tooltip: {
          trigger: 'item',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
        },
        series: [
          {
            name: 'Health Status',
            type: 'pie',
            radius: '70%',
            data: [
              {
                value: res[0].Low,
                name: 'Low',
                itemStyle: { color: 'lightgreen' },
              },
              {
                value: res[0].Medium,
                name: 'Medium',
                itemStyle: { color: 'yellow' },
              },
              {
                value: res[0].High,
                name: 'High',
                itemStyle: { color: 'orange' },
              },
              {
                value: res[0].Urgent,
                name: 'Severe',
                itemStyle: { color: 'red' },
              },
            ],
            label: {
              formatter: '{d}%',
              // position: 'inner'
            },
          },
        ],
      };

      // Set chart options and render
      chart.setOption(options);

      // this.prods.getWishProd();

      // setTimeout(()=>{
      //   this.product = this.prods.wishProd;
      // },1000)

  // Set chart options and render
  })
}


  createChart(){

    this.chart = new Chart("MyChart", {
      type: 'line',
      data: {
        labels: ['Urgent','High' , 'Medium' , 'Low'],
        datasets: [{
            label: 'Data',
            data: [{ x: 10, y: 'Low' }, { x: 20, y: 'Low' }, { x: 30, y: 'High' }, { x: 40, y: 'Medium' } , { x: 50, y: 'Low' }, { x: 60, y: 'Urgent' }, { x: 70, y: 'High' }, { x: 80, y: 'Urgent' }],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
      },
      options: {
        responsive: true,
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
            },
            y: {
                type: 'category',
                // labels: ['Severe', 'High', 'Medium', 'Low']
            }
        }
    }
    });
  }
}
