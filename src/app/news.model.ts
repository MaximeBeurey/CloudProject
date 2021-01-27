export class News {

    public userName: string;
    public date: Date;
    public description: string;
    public countrySlug: string;

    public constructor(userName: string, date: Date, description: string, countrySlug: string){
        this.userName = userName;
        this.date = date;
        this.description = description;
        this.countrySlug = countrySlug;
    }
}