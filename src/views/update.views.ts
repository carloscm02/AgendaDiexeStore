import { Contact } from "../models/contact.model";
import { UpdateTemplates } from "../templates/update.templates";

export class UpdateView{

    private updateSection = document.querySelector("#updateSection") as HTMLElement;
    private template = new UpdateTemplates;
    
    public renderContact(contact: Contact, callBack: Function): void{

        const allPhones = this.printAllPhones(contact.phones);

        this.updateSection.innerHTML = this.template.updateNew(contact, allPhones);
        
        const morePhone = document.querySelector("#updateMorePhone") as HTMLInputElement;

        morePhone.addEventListener("click", () => {
            morePhone.insertAdjacentHTML("beforebegin", `<input type="text" class="updateTelephones">`);
        });

        const update = document.querySelector("#update") as HTMLButtonElement;
        
        update.addEventListener("click", () => {

            const getAllPhones = this.getAllPhones();

            const contact = {
                _name: (document.querySelector("#updateName") as HTMLInputElement).value,
                _surname: (document.querySelector("#updateSurname") as HTMLInputElement).value,
                _phones: getAllPhones,
                _birthAt: (document.querySelector("#updateBirthAt") as HTMLInputElement).value,
                _photo: (document.querySelector("#updatePhoto") as HTMLInputElement).value,
                id: update.dataset.id,
            };
            callBack(new Contact(contact));
            this.updateSection.innerHTML = this.template.upadateBasic();
        });

        
    }

    private printAllPhones(phones: string[]): string{
        return phones.reduce((allPhonesDom, phone)=>{
            return allPhonesDom+`<input type="text" class="updateTelephones" value="${phone}">`
        }, ""
        );
    }

    private getAllPhones(): string[]{
        const phones = document.querySelectorAll(".updateTelephones") as NodeListOf<HTMLInputElement>;
        
        const allPhones: string[] = Array.from(phones).reduce((phoneList, phone) => {return [...phoneList, phone.value]}, []);
        return allPhones;
    }

}