export class Country {

    public slug: string;
    public name: string;

    public constructor(slug: string, name: string){
        this.name = name;
        this.slug = slug;
    }
}