import { Country } from './country.model';

export type Line = [string, string, number, ...number[]] & {length: 8};
export class SummaryData {

    public data: JSON;

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

    private getNumberOfCountries(): number{
        return this.data["Countries"].length;
    }

    private getCountryName(i: number): string {
        return this.data["Countries"][i].Country;
    }

    private getCountrySlug(i: number): string {
        return this.data["Countries"][i].Slug;
    }
    private getCountryNewCases(i: number): number {
        return this.data["Countries"][i].NewConfirmed;
    }

    private getCountryTotalCases(i: number): number {
        return this.data["Countries"][i].TotalConfirmed;
    }

    private getCountryNewRecoveries(i: number): number {
        return this.data["Countries"][i].NewRecovered;
    }

    private getCountryTotalRecoveries(i: number): number {
        return this.data["Countries"][i].TotalRecovered;
    }

    private getCountryNewDeaths(i: number): number {
        return this.data["Countries"][i].NewDeaths;
    }

    private getCountryTotalDeaths(i: number): number {
        return this.data["Countries"][i].TotalDeaths;
    }

    public getCountryData(): Line[]{
        let n = this.getNumberOfCountries()
        let ret: Line[] = [];
        for (let i = 0; i < n; i++){
            let line: Line = [
                this.getCountryName(i),
                this.getCountrySlug(i),
                this.getCountryNewCases(i),
                this.getCountryTotalCases(i),
                this.getCountryNewRecoveries(i),
                this.getCountryTotalRecoveries(i),
                this.getCountryNewDeaths(i),
                this.getCountryTotalDeaths(i)
            ];
            ret.push(line);
        }
        return ret;
    } 

    public getCountrySummaryData(slug: string): any {
        let countryData = this.data["Countries"];
        for (let i = 0; i<this.getNumberOfCountries(); i++) {
            if (countryData[i].Slug === slug) {
                return countryData[i];
            }
        }
        return null;
    }

    public getAllCountriesNames(): Country[] {
        let ret = [];
        let worldwide = new Country("worldwide", "Worldwide");
        ret.push(worldwide);
        let countries = [];
        for (let i = 0; i < this.getNumberOfCountries(); i++) {
            let temp = new Country(this.getCountrySlug(i), this.getCountryName(i));
            countries.push(temp);
        }
        countries.sort((a, b) => {
            if (a < b) {
                 return 1;
            } else {
                return -1;
            }
        });
        ret = ret.concat(countries);
        return ret;
    }

}