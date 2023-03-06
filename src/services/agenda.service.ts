import { Contact } from "../models/contact.model";
import { HttpService } from "./http.service";
import {v4 as uuidv4} from "uuid";
import { StorageService } from "./storage.service";
import { ContactRepository } from "./bd.service";

type Id = string;

export class AgendaService{
    
    constructor(
        private httpService: HttpService, // backend - entre módulos
        private storage: StorageService, //offline
        private contactRepository: ContactRepository, // Base de conocimiento
     //   private contactStore: ContactStore, // Memoria RAM
        ){}
    
    private contacts: Map<Id, Contact> = new Map<Id, Contact>();

    public async loadList(){
        const isIndexBB = await this.contactRepository.length()
        if(isIndexBB){
            return this.loadAllLocal();
        }else{
            return this.loadAllBackend();
        }
    }

    
    private async loadAllBackend(){
        const allContacts = await this.httpService.get('http://localhost:3000/contacts')
            for (const contactRegister of allContacts) {
                const contact = new Contact(contactRegister);
                this.contacts.set(contact.id, contact);
               // this.contactUnitOfWork.add(contactRegister);
               // this.contactRepository.add(contactRegister); // Tarda 10 ms
            }
            this.contactRepository.bulkAdd(Array.from(this.contacts.values()));
           // this.contactUnitOfWork.execute();
    }


    private async loadAllLocal(): Promise<void>{
        this.loadAddOffline();
        this.loadUpdateOffline();
        this.loadDeleteOffline();

        const allContacts = await this.contactRepository.getAll();
        for (const contactRegister of allContacts) {
            const contact = new Contact(contactRegister);
            this.contacts.set(contact.id, contact); 
        }
    }

    private loadAddOffline(){
        const contactsToAdd = JSON.parse(this.storage.getEspecialArray('addOffline')) ?? [];
        for (const contact of contactsToAdd) {
            this.httpService.post('http://localhost:3000/contacts', contact);
        }
        contactsToAdd ? this.storage.remove('addOffline') : null;
    }

    private loadUpdateOffline(){
        const contactsToUpdate = JSON.parse(this.storage.getEspecialArray('updateOffline')) ?? [];
        for(const contact of contactsToUpdate){
            this.httpService.put(`http://localhost:3000/contacts/${contact.id}`, contact);
        }
        contactsToUpdate ? this.storage.remove('updateOffline') : null;
    }

    private loadDeleteOffline(){
        const contactsToDelete = JSON.parse(this.storage.getEspecialArray('dltOffline')) ?? [];
        for(const id of contactsToDelete){
            this.httpService.delete(`http://localhost:3000/contacts/${id}`);
        }
        contactsToDelete ? this.storage.remove('dltOffline') : null;
    }


    public findAll() {
        return Array.from(this.contacts.values());
    }
    

    public async addContact(contact: Contact): Promise<void>{
        contact.id = uuidv4();
        this.contacts.set(contact.id, contact);
        this.contactRepository.add(contact);
        await this.httpService.post('http://localhost:3000/contacts', contact);
    }
    
    public async deleteContact(id: Id): Promise<void>{
        this.contacts.delete(id);
        this.contactRepository.remove(id);
        await this.httpService.delete(`http://localhost:3000/contacts/${id}`);
    }
    
    public updateContact(contact: Contact): Promise<Response>{
        this.contacts.delete(contact.id);
        this.contacts.set(contact.id, contact);
        this.contactRepository.put(contact);
        return this.httpService.put(`http://localhost:3000/contacts/${contact.id}`, contact);
    }
    
    
    public addContactOffline(contact: Contact){
            this.storage.addOffline(contact);
    }
    public updateContactOffline(contact: Contact){
            this.storage.updateOffline(contact);
    }
    public deleteContactOffline(id: Id){
            this.storage.deleteOffline(id);
    }
}