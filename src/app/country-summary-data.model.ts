export class CountrySummaryData {

    private data: JSON;

    public constructor(data: JSON) {
        this.data = data;
    }

    public getCountry(): string {
        return this.data["Country"];
    }

    public getTotalCases(): number {
        return this.data["TotalConfirmed"];
    }

    public getTotalDeaths(): number {
        return this.data["TotalDeaths"];
    }

    public getTotalRecovered(): number {
        return this.data["TotalRecovered"];
    }

    public getNewCases(): number {
        return this.data["NewConfirmed"];
    }

    public getNewRecovered(): number {
        return this.data["NewRecovered"];
    }

    public getNewDeaths(): number {
        return this.data["NewDeaths"];
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