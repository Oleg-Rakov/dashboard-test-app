import {Component, ViewChild} from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import {Chart, ChartConfiguration, ChartOptions, ChartType, registerables } from 'chart.js';

// Register all elements Chart.js
Chart.register(...registerables);

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
  standalone: true,
  imports: [BaseChartDirective],
})
export class LineChartComponent {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        label: 'This Week',
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: 'origin',
      },
    ],
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  };

  public lineChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  public lineChartType: ChartType = 'line';

  // Data examples
  private weeklyData = [65, 59, 80, 81, 56, 55, 40];
  private monthlyData = [300, 200, 180, 290, 250, 210, 300];

  // Switch data
  public switchData(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const period = selectElement.value;

    if (period === 'This Week') {
      this.lineChartData.datasets[0].data = this.weeklyData;
      this.lineChartData.datasets[0].label = 'This Week';
    } else if (period === 'This Month') {
      this.lineChartData.datasets[0].data = this.monthlyData;
      this.lineChartData.datasets[0].label = 'This Month';
    }

    // Rerender chart
    this.chart?.update();
  }
}
