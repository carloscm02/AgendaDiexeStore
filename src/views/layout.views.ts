import { Contact } from "../models/contact.model";
import { LayoutTemplate } from "../templates/layout.templates";
type Id = string;

export class LayoutView{
    
    private template = new LayoutTemplate;
    private list = document.querySelector("#list") as HTMLElement;

    public renderOneContact(contact: Contact, isNew: boolean): void{
        if(!isNew){this.removeOneContact(contact.id)};
        const phones = this.renderPhones(contact.phones);
        const insideCard = this.template.NewCard(contact, phones);

        let newCard = document.createElement("div");
        newCard.setAttribute('class','card');
        newCard.innerHTML = insideCard;
        this.list.appendChild(newCard);
    }
    

    public renderContactsTemplate(contacs: Contact[]): void{
        this.list.innerHTML = "";
        for (const contact of contacs) {
            const phones = this.renderPhones(contact.phones);
            this.list.innerHTML +=
            `
            <div class="card">
                ${this.template.NewCard(contact, phones)}    
            </div>
                `;
            }
    }

    private renderPhones(phones: string[]): string{
        return phones.reduce((acc, phone)=>{return acc + `<p class="statement text-aside info">${phone}</p>`},"");
    }
    

    public bindDeleteContact(callBack: Function, onlyThis: Id): void{
        if(onlyThis){
            const contact = document.querySelector(`[data-id='${onlyThis}']`) as HTMLElement;
            contact.addEventListener("click", () => {
                callBack(onlyThis);
            });
        }else{
            const deleteButtons = document.querySelectorAll(".delete") as NodeListOf<HTMLButtonElement>;
            for (const deleteButton of deleteButtons) {
                deleteButton.addEventListener("click", () => {
                    const  id = deleteButton.dataset.id;
                    callBack(id);
                });
            }
        }
    }

    public removeOneContact(id: Id){
        const contact = document.querySelector(`[data-id='${id}']`) as HTMLElement;
        contact.parentElement.parentElement.remove();
    }

    public bindModifyContact(callBack: Function, onlyThis: Contact): void{
        if(onlyThis){
            const updateButton = document.querySelector(`[data-contact='${JSON.stringify(onlyThis)}']`) as HTMLElement ;
            updateButton.addEventListener("click", ()=>{
                callBack(onlyThis);
            })
        }else{    
            const updateButtons = document.querySelectorAll(".update") as NodeListOf<HTMLButtonElement>;
            for (const updateButton of updateButtons) {
                updateButton.addEventListener("click", () => {
                    callBack(new Contact (JSON.parse(updateButton.dataset.contact)));
                });
            }
        }
    }


}