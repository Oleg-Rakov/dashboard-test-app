import {Component, ViewChild, OnInit} from '@angular/core';
import {HeaderComponent} from '../../shared/header/header.component';
import {SummaryComponent} from '../../shared/summary/summary.component';
import {LineChartComponent} from '../../shared/line-chart/line-chart.component';
import {BarChartComponent} from '../../shared/bar-chart/bar-chart.component';
import {FilterFormComponent} from '../../shared/filter-form/filter-form.component';
import {DataService} from '../../core/data.service';
import {DashboardData} from '../../core/models/dashboard-data.model';
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  providers: [
    DataService,
  ],
  imports: [
    HeaderComponent,
    SummaryComponent,
    LineChartComponent,
    BarChartComponent,
    FilterFormComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  @ViewChild(LineChartComponent) lineChartComponent?: LineChartComponent;
  @ViewChild(BarChartComponent) barChartComponent?: BarChartComponent;

  dashboardData: DashboardData | null = null; // Dashboard data get from request

  constructor(private dataService: DataService, private meta: Meta, private title: Title) {
  }


  ngOnInit(): void {
    // Get data from dashboard
    this.title.setTitle('Dashboard Application');
    this.meta.addTags([
      {name: 'description', content: 'A sample Angular dashboard with SSR'},
      {name: 'keywords', content: 'Angular, SSR, Dashboard'},
    ]);

    console.log('dash init')
    this.dataService.getDashboardData().subscribe((data) => {
      this.dashboardData = data;
      this.initializeCharts(); // Init charts with data
    });
  }

  initializeCharts(): void {
    if (this.dashboardData) {
      if (this.lineChartComponent) {
        this.lineChartComponent.lineChartData.datasets[0].data =
          this.dashboardData.lineChart.values || []; // If undefined set empty array
        this.lineChartComponent.lineChartData.datasets[0].label =
          this.dashboardData.lineChart.label || 'No Data';
        this.lineChartComponent.lineChartData.labels =
          this.dashboardData.lineChart.labels || [];
        this.lineChartComponent.chart?.update();
      }

      if (this.barChartComponent) {
        this.barChartComponent.barChartData.datasets[0].data =
          this.dashboardData.barChart.values || []; // If undefined set empty array
        this.barChartComponent.barChartData.datasets[0].label =
          this.dashboardData.barChart.label || 'No Data';
        this.barChartComponent.barChartData.labels =
          this.dashboardData.barChart.labels || [];
        this.barChartComponent.chart?.update();
      }
    }
  }

  onDateRangeSelected(dateRange: { startDate: string; endDate: string }): void {
    this.updateChartsData(dateRange.startDate, dateRange.endDate);
  }

  updateChartsData(startDate: string, endDate: string): void {
    if (this.dashboardData) {
      const filteredLineData = this.dashboardData.lineChart.values.slice(0, 5);
      const filteredBarData = this.dashboardData.barChart.values.slice(1, 5);

      if (this.lineChartComponent) {
        this.lineChartComponent.lineChartData.datasets[0].data = [...filteredLineData];
        this.lineChartComponent.lineChartData.datasets[0].label = `Filtered Data (${startDate} - ${endDate})`;
        this.lineChartComponent.chart?.update();
      }

      if (this.barChartComponent) {
        this.barChartComponent.barChartData.datasets[0].data = [...filteredBarData];
        this.barChartComponent.barChartData.datasets[0].label = `Filtered Data (${startDate} - ${endDate})`;
        this.barChartComponent.chart?.update();
      }
    }
  }
}
