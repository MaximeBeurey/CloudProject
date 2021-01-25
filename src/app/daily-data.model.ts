import { SingleDataSet, Label } from 'ng2-charts';
import { ChartDataSets } from 'chart.js';

export class DailyData {

    private data: JSON;

    public constructor(data: JSON){
        this.data = data;
    }

    public getData(): JSON {
        return this.data;
    }

    private getWeekRecoveries() {
        // returns last seven days recoveries
        return Object.values(this.data["recovered"]);
    }

    private getWeekDeaths() {
        // returns last seven days deaths
        return Object.values(this.data["deaths"]);
    }

    private getWeekNewCases() {
        // returns last seven days new cases
        return Object.values(this.data["cases"]);
    }

    public getBarChartData(): ChartDataSets[] {
        return [
            {data : this.getWeekDeaths(), label: "Daily Deaths"},
            {data : this.getWeekRecoveries(), label: "Daily Recovered"},
            {data : this.getWeekNewCases(), label: "Daily New Cases"},
          ];
    }

    public getBarChartLabel(): Label[] {
        return Object.keys(this.data["cases"]);
    }

}