import { ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

export class CountryDailyData {

    public data: Array<JSON>;

    public constructor(data: JSON) {
        let rawData = data;
        this.data = [];
        for (let x of Object.keys(rawData)) {
            if (rawData[x]["Province"] == ""){
                this.data.push(rawData[x])
            }
        }
    }

    private getLastWeekData() {
        let l = this.data.length;
        let cases = [];
        let deaths = [];
        let recovered = [];
        let labels = [];
        for (let i = 7; i > 0; i--){
            cases.push(this.data[l-i]["Confirmed"]);
            deaths.push(this.data[l-i]["Deaths"]);
            recovered.push(this.data[l-i]["Recovered"]);
            labels.push(new Date(this.data[l-i]["Date"]).toDateString().substring(4));
        }
        return [cases, deaths, recovered, labels];
    }

    public getWeekChartData(): ChartDataSets[] {
        let values = this.getLastWeekData();
        return [
            {data: values[1], label: "Daily Deaths"},
            {data: values[2], label: "Daily Recovered"},
            {data: values[0], label: "Daily New Cases"}
        ];
    }

    public getWeekChartLabels(): Label[] {
        let values = this.getLastWeekData();
        return values[3];
    }

    private getAllData() {
        let cases = [];
        let deaths = [];
        let recovered = [];
        let labels = [];
        for (let i = 0; i < this.data.length; i++) {
            cases.push(this.data[i]["Confirmed"]);
            deaths.push(this.data[i]["Deaths"]);
            recovered.push(this.data[i]["Recovered"]);
            labels.push(new Date(this.data[i]["Date"]).toDateString().substring(4));
        }
        return [cases, deaths, recovered, labels];
    }

    public getLineChartData(): ChartDataSets[] {
        let values = this.getAllData();
        return [
            {data: values[1], label: "Daily Deaths"},
            {data: values[2], label: "Daily Recovered"},
            {data: values[0], label: "Daily New Cases"}
        ];
    }

    public getLineChartLabels(): Label[] {
        let values = this.getAllData();
        return values[3];
    }

    public getDate(): Date {
        return new Date(this.data[this.data.length - 1]["Date"]);
    }


}