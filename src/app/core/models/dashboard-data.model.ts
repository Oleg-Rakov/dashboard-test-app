export interface DashboardData {
  lineChart: {
    values: number[];
    labels: string[];
    label: string;
  };
  barChart: {
    values: number[];
    labels: string[];
    label: string;
  };
}
