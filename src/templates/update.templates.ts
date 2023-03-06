export class UpdateTemplates{
 
    public upadateBasic(){
        return `
        <div class="section">
        <div>
          <label class="statement text-aside" for="UpdateName">Nombre</label>
          <input type="text" name="nombre" id="UpdateName" />
        </div>
        <div>
          <label class="statement text-aside" for="updateSurname">Apellido</label>
          <input type="text" name="apellido" id="updateSurname" />
        </div>
        <div>
        <span class="statement text-aside">Telefono</span>
        <input type="button" id="updateMorePhone" value="+" disabled/>
        </div>
        <div>
          <label class="statement text-aside" for="updateBirthAt">Fecha de nacimiento</label>
          <input type="date" name="fecha" id="updateBirthAt" />
        </div>
        <div>
          <label class="statement text-aside" for="updatePhoto">Foto</label>
          <input type="text" name="foto" id="updatePhoto" />
        </div>
          <div>
        <button id="update" disabled class="setting-image"></button>
              </div>
      </div>`
    }

    public updateNew(contact, allPhones){
        return `
        <div class="section">
            <div>
                <label class="statement text-aside" for="UpdateName">Nombre</label>
                <input type="text" name="nombre" id="updateName" value="${contact.name}">
            </div>

            <div>
                <label class="statement text-aside" for="updateSurname">Apellido</label>
                <input type="text" name="apellido" id="updateSurname" value="${contact.surname}">
            </div>     

            <div>
                <span class="statement text-aside">Telefonos:</span>
                ${allPhones}
                <input type="button" name="telefono" id="updateMorePhone" value="+">
            </div>

            <div>
                <label class="statement text-aside" for="updateBirthAt">Fecha de nacimiento</label>
                <input type="date" name="fecha" id="updateBirthAt" value="${contact.birthAt}">
            </div>
        
            <div>
                <label class="statement text-aside" for="updatePhoto">Foto</label>
                <input type="url" name="foto" id="updatePhoto" value="${contact.photo}">
            </div>     

            <div>
                <button id="update" data-id="${contact.id}" class="ok setting-image"></button>
            </div>
        </div>
        `
    }
}