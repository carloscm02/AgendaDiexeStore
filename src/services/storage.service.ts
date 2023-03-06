import { Contact } from "../models/contact.model";

type Id = string;
type EspecialArray = string;

export class StorageService{

    private addOfflinecontacts = [];
    private updateOfflinecontacts = [];
    private deleteOfflinecontacts = [];

    constructor(
        private readonly store: Storage,
        ){}


    public getEspecialArray(especialArray: EspecialArray): string{
        return this.store.getItem(especialArray);
    }

    public addOffline(contact: Contact): void {
        this.addOfflinecontacts = [...this.addOfflinecontacts, contact];
        this.store.setItem('addOffline', JSON.stringify(this.addOfflinecontacts));
    }
    public updateOffline(contact: Contact): void {
        this.updateOfflinecontacts = [...this.updateOfflinecontacts, contact];
        this.store.setItem('updateOffline', JSON.stringify(this.updateOfflinecontacts));
    }
    public deleteOffline(id: Id): void {
        this.deleteOfflinecontacts = [...this.deleteOfflinecontacts, id];
        this.store.setItem('dltOffline', JSON.stringify(this.deleteOfflinecontacts));
    }

    public remove(data: string){
        this.store.removeItem(data);
    }

}