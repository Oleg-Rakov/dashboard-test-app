import { Component, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
  standalone: true,
  imports: [BaseChartDirective],
})
export class BarChartComponent {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public barChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [30, 50, 70, 20, 90, 40],
        label: 'Products',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
    labels: ['Product A', 'Product B', 'Product C', 'Product D', 'Product E', 'Product F'],
  };

  public barChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  public barChartType: ChartType = 'bar';

  private dataset1 = [30, 50, 70, 20, 90, 40];
  private dataset2 = [50, 60, 40, 80, 30, 70];

  public switchData(event: Event): void {
    const selectElement = event.target as HTMLSelectElement; // Transfer to HTMLSelectElement
    const dataset = selectElement.value;

    if (dataset === 'Dataset 1') {
      this.barChartData.datasets[0].data = this.dataset1;
      this.barChartData.datasets[0].label = 'Dataset 1';
    } else if (dataset === 'Dataset 2') {
      this.barChartData.datasets[0].data = this.dataset2;
      this.barChartData.datasets[0].label = 'Dataset 2';
    }

    // Обновляем график
    this.chart?.update();
  }
}
