import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { Chart } from "angular-highcharts";
import { ChartData } from "src/app/models/chartData";
import { FilterOptions } from "src/app/enums/common.enum";
import { FormControl } from "@angular/forms";

interface FilterItem {
  id: FilterOptions;
  label: string;
}

@Component({
  selector: "app-chart",
  templateUrl: "./chart.component.html",
  styleUrls: ["./chart.component.scss"],
})
export class ChartComponent implements OnInit {
  chart: Chart = new Chart();
  _chartData: ChartData[] = [];
  @Input() set chartData(value: ChartData[]) {
    if (value.length == 7 && this.selectedFilterOptionId)
      this.selectedFilterOptionId.patchValue(FilterOptions.LAST_WEEK);

    this._chartData = value;

    this.reinit();
  }

  @Output() onFilterItemSelect: EventEmitter<FilterOptions> = new EventEmitter<
    FilterOptions
  >();

  get filterOptions() {
    return FilterOptions;
  }

  selectedFilterOptionId!: FormControl;
  filterItems: FilterItem[] = [
    {
      id: FilterOptions.LAST_WEEK,
      label: "Last 7 days",
    },
    {
      id: FilterOptions.LAST_MONTH,
      label: "Last 30 days",
    },
    {
      id: FilterOptions.LAST_YEAR,
      label: "Last year",
    },
  ];

  constructor() {}

  ngOnInit() {
    this.init();
    this.selectedFilterOptionId = new FormControl(FilterOptions.LAST_WEEK);
  }

  init() {
    this.chart = new Chart({
      chart: {
        type: "line",
      },
      title: {
        text: "",
      },
      credits: {
        enabled: false,
      },
      xAxis: {
        type: "category",
      },
      series: [
        {
          name: "Confirmed",
          type: "line",
          data: this._chartData,
        },
      ],
    });
  }

  reinit() {
    if (this.chart.ref)
      this.chart.removeSeries(this.chart.ref.series.length - 1);

    this.chart.addSeries(
      {
        name: "Confirmed",
        type: "line",
        data: this._chartData,
      },
      true,
      true
    );
  }

  onFilterItemsChange(filterItem: FilterItem | undefined) {
    if (filterItem != undefined) this.onFilterItemSelect.emit(filterItem.id);
  }
}
