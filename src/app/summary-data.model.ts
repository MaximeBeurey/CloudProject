export class SummaryData {

    private data: JSON;

    public constructor(data: JSON) {
        this.data = data;
    }

    public getData(): JSON {
        return this.data;
    }

    public getTotalCases(): number {
        return this.data["Global"].TotalConfirmed;
    }

    public getTotalDeaths(): number {
        return this.data["Global"].TotalDeaths;
    }

    public getTotalRecovered(): number {
        return this.data["Global"].TotalRecovered;
    }

    public getNewCases(): number {
        return this.data["Global"].NewConfirmed;
    }

    public getNewRecovered(): number {
        return this.data["Global"].NewRecovered;
    }

    public getNewDeaths(): number {
        return this.data["Global"].NewDeaths;
    }

    public getActiveCases(): number {
        // active cases = total cases - (total death + total recovered)
        return this.getTotalCases() - this.getTotalDeaths() - this.getTotalRecovered();
    }

    public getRecoveryRate(): number {
        // recovery rate = total recovered / total cases
        return Math.floor((this.getTotalRecovered() / this.getTotalCases())*10000)/100;
    }

    public getMortalityRate(): number {
        // mortality rate = total death / total cases
        return Math.floor((this.getTotalDeaths() / this.getTotalCases())*10000)/100;
    }

    public getDate(): Date {
        return this.data["Date"];
    }

}