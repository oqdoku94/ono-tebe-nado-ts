import './scss/styles.scss';

import {AuctionAPI} from "./components/AuctionAPI";
import {API_URL, CDN_URL} from "./utils/constants";
import {EventEmitter} from "./components/base/events";
import { ensureElement } from './utils/utils';
import { LotView } from './components/LotView';

const events = new EventEmitter();
const api = new AuctionAPI(CDN_URL, API_URL);

// Чтобы мониторить все события, для отладки
events.onAll(({ eventName, data }) => {
    console.log(eventName, data);
})

// Все шаблоны
const lotItemTemplate = ensureElement<HTMLTemplateElement>('#card');

// Модель данных приложения
const content = ensureElement('.page__container');

// Глобальные контейнеры
const catalogItemsContainer = ensureElement('.catalog__items');

// Переиспользуемые части интерфейса


// Дальше идет бизнес-логика
// Поймали событие, сделали что нужно


// Получаем лоты с сервера
api.getLotList()
    .then(result => {
      result.forEach(lot => new LotView(catalogItemsContainer, lotItemTemplate).render(lot));
        // вместо лога поместите данные в модель
        console.log(result);
    })
    .catch(err => {
        console.error(err);
    });


