import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as echarts from 'echarts';
import { PatientService } from '../services/patient.service';

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
    });
  }
}
