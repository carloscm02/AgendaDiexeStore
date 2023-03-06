import { Contact } from "../models/contact.model";

type url = string;

export class HttpService{
    public async get(url: url){
        const data = await fetch(url);
        return data.json();
    }

    public delete(url: url) {
        return fetch(url, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    public post(url: url, contact: Contact) {
        return fetch(url, {
            method: "POST",
            body: JSON.stringify(contact),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    public put(url: url, contact: Contact) {
        return fetch(url, {
            method: "PUT",
            body: JSON.stringify(contact),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    public drop(url: url){
        return fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

}