import { Contact as IContact} from '../interfaces/contact.interface';

export class Contact{
 
    public id: string;
    private _name: string;
    private _surname: string;
    private _phones: string[];
    private _birthAt: string;
    private _photo: string;

    constructor(contact: IContact){
        this.id = contact.id;
        this._name = contact._name;
        this._surname = contact._surname;
        this._phones = contact._phones;
        this._birthAt = contact._birthAt;
        this._photo = contact._photo;
    }
    
    get name(): string{
        return this._name;
    }
    
    get surname(): string{
        return this._surname;
    }
    
    get phones(): string[]{
        return this._phones??[];
    }

    get birthAt(): string{
        return this._birthAt??"";
    }
    
    get photo(): string{
        return this._photo;
    }
    
    set name(name: string){
        this._name = name;
    }
    
    set surname(surname: string){
        this._surname = surname;
    }
    
    set phones(phones: string[]){
        this._phones = phones;
    }

    set birthAt(birthAt: string){
        this._birthAt = birthAt;
    }

    set photo(photo: string){
        this._photo = photo;
    }

}