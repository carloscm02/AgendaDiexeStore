export class LayoutTemplate{
    
    public NewCard(contact, phones){
        return `
        <img src="${contact.photo}"></img>
        <h2 class="statement text-aside">Nombre: <span class="info">${contact.name}</span></h2>
        <h3 class="statement text-aside">Apellido: <span class="info">${contact.surname}</span></h3>
        <h3 class="statement text-aside">Telefono: </h3>
        <div class="phone-list">${phones}</div>
        <h3 class="statement text-aside">Fecha nacimiento: <span class="info">${contact.birthAt}</span></h3>
            <div class="flex">
                <button class="delete delete-image" data-id='${contact.id}'></button>
                <button class="update edit-image" data-contact='${JSON.stringify(contact)}'></button>
            </div>
            `
    }
}