import { LayoutView } from './views/layout.views';
import { AddView } from './views/add.views';
import { UpdateView } from './views/update.views';
import { AgendaService } from './services/agenda.service';
import { AgendaController } from './controllers/agenda.controller';
import { HttpService } from './services/http.service';
import { StorageService } from './services/storage.service';
import { ContactRepository } from './services/bd.service';
import Dexie from 'dexie';


const httpService = new HttpService();

const store = window.localStorage;
const storage = new StorageService(store);

const ddbb = new Dexie('ddbb');
const db = new ContactRepository(ddbb);

const agendaService = new AgendaService(httpService, storage, db);

const layoutView = new LayoutView();
const addView = new AddView();
const updateView = new UpdateView();

new AgendaController(layoutView, addView, updateView, agendaService);