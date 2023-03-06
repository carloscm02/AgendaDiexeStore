import { Contact } from "../models/contact.model";

export class AddView{

    constructor(){
        this.morePhone.addEventListener("click", () => {
            this.morePhone.insertAdjacentHTML("beforebegin", `<input type="text" name="phone" class="phone" placeholder="Telefono">`);
        });
    }

    private name = document.querySelector("#name") as HTMLInputElement;
    private surname = document.querySelector("#surname") as HTMLInputElement;
    private birthAt = document.querySelector("#birthAt") as HTMLInputElement;
    private photo = document.querySelector("#photo") as HTMLInputElement;
    private add = document.querySelector("#add") as HTMLButtonElement;
    
    private morePhone = document.querySelector("#morePhone") as HTMLInputElement;

    public bindAddContact(callBack: Function): void{
        this.add.addEventListener("click", () => {
            const allPhones = this.getAllPhones();
            const contact = {
                id: "temporal",
                _name: this.name.value,
                _surname: this.surname.value,
                _birthAt: this.birthAt.value,
                _photo: this.photo.value,
                _phones: allPhones,
            };
            callBack(new Contact(contact));
            this.clearAddSection();
        });
    }

    public clearAddSection(){
        this.name.value="";
        this.surname.value="";
        this.birthAt.value="";
        this.photo.value="";
        const phones = document.querySelectorAll(".phone");
        for (const phone of phones) {
            phone.remove();
        }
    }

    private getAllPhones(): string[]{
        const phones = document.querySelectorAll(".phone") as NodeListOf<HTMLInputElement>;

        const allPhones: string[] = Array.from(phones).reduce((phoneList, phone) => {return [...phoneList, phone.value]}, []);
        return allPhones;
    }


}