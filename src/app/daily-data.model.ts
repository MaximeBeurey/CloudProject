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
        let values = Object.values(this.data["recovered"]);
        let index = Object.keys(this.data["recovered"]);
        let indexDate = index.map(s => {
            let l = s.split("/");
            l = ["20"+l[2], l[0], l[1]];
            return new Date(l.join("-"));
        });
        let both = [];
        for (let i=0; i < values.length; i++){
            both.push([indexDate[i], values[i]])
        }
        both = both.sort((a,b) => a[0] < b[0] ? -1 : 1)
        let ret = [];
        for (let i=0; i < values.length; i++){
            ret.push(both[i][1]);
        }
        return ret;
    }

    private getWeekDeaths() {
        let values = Object.values(this.data["deaths"]);
        let index = Object.keys(this.data["deaths"]);
        let indexDate = index.map(s => {
            let l = s.split("/");
            l = ["20"+l[2], l[0], l[1]];
            return new Date(l.join("-"));
        });
        let both = [];
        for (let i=0; i < values.length; i++){
            both.push([indexDate[i], values[i]])
        }
        both.sort((a,b) => a[0] < b[0] ? -1 : 1)
        let ret = [];
        for (let i=0; i < values.length; i++){
            ret.push(both[i][1]);
        }
        return ret;
    }

    private getWeekNewCases() {
        let values = Object.values(this.data["cases"]);
        let index = Object.keys(this.data["cases"]);
        let indexDate = index.map(s => {
            let l = s.split("/");
            l = ["20"+l[2], l[0], l[1]];
            return new Date(l.join("-"));
        });
        let both = [];
        for (let i=0; i < values.length; i++){
            both.push([indexDate[i], values[i]])
        }
        both.sort((a,b) => a[0] < b[0] ? -1 : 1)
        let ret = [];
        for (let i=0; i < values.length; i++){
            ret.push(both[i][1]);
        }
        return ret;
    }

    public getChartData(): ChartDataSets[] {
        return [
            {data : this.getWeekDeaths(), label: "Daily Deaths"},
            {data : this.getWeekRecoveries(), label: "Daily Recovered"},
            {data : this.getWeekNewCases(), label: "Daily New Cases"},
          ];
    }

    public getChartLabel(): Label[] {
        let values = Object.keys(this.data["cases"]);
        let splited = values.map(s => s.split("/"));
        splited = splited.map(s => ["20"+s[2], s[0], s[1]]);
        let joined = splited.map(s => s.join("-"));
        let dates = joined.map(date => new Date(date));
        dates.sort((a, b) => {return a < b ? -1 : 1;});
        let ret = dates.map(s => s.toDateString().substring(4));
        return ret;
    }

}