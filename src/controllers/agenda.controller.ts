import { LayoutView } from '../views/layout.views';
import { AddView } from '../views/add.views';
import { UpdateView } from '../views/update.views';
import { AgendaService } from '../services/agenda.service';
import { Contact } from '../models/contact.model';

type Id = string;

export class AgendaController{

    constructor(
        private readonly layoutView: LayoutView,
        private readonly addView: AddView,
        private readonly updateView: UpdateView,
        private readonly agendaService: AgendaService,
      ){
        this.agendaService.loadList()
          .then(()=>{this.layoutView.renderContactsTemplate(this.agendaService.findAll())})
          .then(()=>{this.layoutView.bindDeleteContact(this.handlerDeleteContact,null)})
          .then(()=>{this.layoutView.bindModifyContact(this.handlerModifyContact,null)})
        
        this.addView.bindAddContact(this.handlerAddContact)
      }

      
      private handlerAddContact = (contact: Contact) => {
        this.agendaService.addContact(contact).
          catch(() => {
            // repintar AVISANDO AL USUARIO QUE NO TIENE CONEXIÓN Y SI NO LE RETORNA CONEXION PERDERÁ LOS DATOS
            // this.layoutView.alertNotConection();
          })
        this.layoutView.renderOneContact(contact, true),
        this.layoutView.bindDeleteContact(this.handlerDeleteContact, contact.id),
        this.layoutView.bindModifyContact(this.handlerModifyContact, contact)
      }
      
      private handlerDeleteContact = (id: Id) => {
        this.layoutView.removeOneContact(id);
        this.agendaService.deleteContact(id)
          .catch(() => this.agendaService.deleteContactOffline(id));
      }
      
      private handlerModifyContact = (contact: Contact) => {
        this.updateView.renderContact(contact, this.handlerUpdateContact);
      }

      private handlerUpdateContact = (contact: Contact) => {
        this.layoutView.renderOneContact(contact, false),
        this.layoutView.bindDeleteContact(this.handlerDeleteContact, contact.id),
        this.layoutView.bindModifyContact(this.handlerModifyContact, contact),
        this.agendaService.updateContact(contact)
          .catch(() => this.agendaService.updateContactOffline(contact));
      }
}