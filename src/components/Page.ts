import { ensureElement } from '../utils/utils';

class Page {
	protected _catalogContainer: HTMLDivElement;

	constructor(protected rootElement: HTMLElement) {
		this._catalogContainer = ensureElement<HTMLDivElement>('catalog__items', this.rootElement);
	}

	set catalogContainer(elements: HTMLElement[]) {
		this._catalogContainer.replaceChildren(...elements);
	}
}