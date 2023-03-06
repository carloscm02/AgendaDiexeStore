import Dexie from 'dexie';

import { Contact } from '../models/contact.model';

type Id = string;

export class ContactRepository {

    constructor(
        private readonly db: Dexie,
        ) {
            this.db.version(1).stores({
                contacts: 'id'
            });
            
            this.table = this.db.table('contacts');
        }
        
    private table: Dexie.Table<Contact, Id>;
    
    public length(): Promise<number> {
        return this.table.count();
    }

    public add(contact: Contact): void {
        this.table.add(contact);
    }
    
    public put(contact: Contact): void {
        this.table.put(contact);
    }

    public remove(id: Id): void {
        this.table.delete(id);
    }

    public async getAll(): Promise<Contact[]> {
        return await this.table.toArray();
    }

    public get(id: string): Promise<Contact> {
        return this.table.get(id);
    }
    public bulkAdd(items: Contact[]): Promise<String> {
        return this.table.bulkAdd(items);
    }

}