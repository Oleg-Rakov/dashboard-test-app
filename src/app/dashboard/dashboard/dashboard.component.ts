import {Component, ViewChild} from '@angular/core';
import {HeaderComponent} from '../../shared/header/header.component';
import {SummaryComponent} from '../../shared/summary/summary.component';
import {LineChartComponent} from '../../shared/line-chart/line-chart.component';
import {BarChartComponent} from '../../shared/bar-chart/bar-chart.component';
import {FilterFormComponent} from '../../shared/filter-form/filter-form.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
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

  // Оригинальные данные для графиков
  lineChartOriginalData = [65, 59, 80, 81, 56, 55, 40];
  barChartOriginalData = [30, 50, 70, 20, 90, 40];

  // Обработка выбранного диапазона дат
  onDateRangeSelected(dateRange: { startDate: string; endDate: string }): void {
    console.log('Date range selected:', dateRange);
    this.updateChartsData(dateRange.startDate, dateRange.endDate);
  }

  // Логика обновления данных для графиков
  updateChartsData(startDate: string, endDate: string): void {
    console.log(`Updating charts with data from ${startDate} to ${endDate}`);

    // Пример фильтрации: оставляем только первые N значений
    const filteredLineData = this.lineChartOriginalData.slice(0, 5);
    const filteredBarData = this.barChartOriginalData.slice(1, 5);

    console.log('Filtered Line Data:', filteredLineData);
    console.log('Filtered Bar Data:', filteredBarData);

    // Update data linear chart
    if (this.lineChartComponent) {
      this.lineChartComponent.lineChartData.datasets[0].data = [...filteredLineData];
      this.lineChartComponent.lineChartData.datasets[0].label = `Filtered Data (${startDate} - ${endDate})`;
      this.lineChartComponent.chart?.update();
    }

    // Update data block chart
    if (this.barChartComponent) {
      this.barChartComponent.barChartData.datasets[0].data = [...filteredBarData];
      this.barChartComponent.barChartData.datasets[0].label = `Filtered Data (${startDate} - ${endDate})`;
      this.barChartComponent.chart?.update();
    }
  }
}
