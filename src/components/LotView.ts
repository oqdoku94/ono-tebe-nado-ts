import { Component } from './base/Component';
import { ILotModel } from '../types/model';
import { ILotView, ILotItemViewConstructor } from '../types/view';
import { LotStatus } from '../types';
import { cloneTemplate, ensureElement } from '../utils/utils';
import { template } from 'lodash';
import dayjs from 'dayjs';

export class LotView extends Component<ILotModel> implements ILotView {
	private _id: string;
	private _status: LotStatus;
	private _datetime: string;

	private readonly lotNode: HTMLElement;
	private readonly titleNode: HTMLHeadingElement;
	private readonly descriptionNode: HTMLParagraphElement;
	private readonly imageNode: HTMLImageElement;
	private readonly placeBetButtonNode: HTMLButtonElement;
	private readonly statusNode: HTMLSpanElement;

	constructor(protected template: HTMLTemplateElement) {
			super(cloneTemplate<HTMLElement>(template));

		this.titleNode = ensureElement<HTMLHeadingElement>('.card__title', this.lotNode);
		this.descriptionNode = ensureElement<HTMLParagraphElement>('.card__description', this.lotNode);
		this.imageNode = ensureElement<HTMLImageElement>('.card__image', this.lotNode);
		this.placeBetButtonNode = ensureElement<HTMLButtonElement>('.card__action', this.lotNode);
		this.statusNode = ensureElement<HTMLSpanElement>('.card__status', this.lotNode);
	}

	public set id(value: string) {
		this._id = value;
	}

	public get id() : string {
		return this._id ?? '';
	}

	public set title(value: string) {
		this.setText(this.titleNode, value);
	}

	public set about(value: string) {
		this.setText(this.descriptionNode, value);
	}

	public set datetime(value: string) {
		this._datetime = value;
		this.updateStatus();
	}

	public set image(src: string) {
		this.setImage(this.imageNode, src);
	}

	public set status(value: LotStatus) {
		this._status = value;
		this.updateStatus();
	}

	protected updateStatus(): void {
		const formattedDate = dayjs(this._datetime).locale('ru').format('DD MMMM HH:mm');

		switch (this._status) {
			case 'active':
				this.setText(this.statusNode, `Открыто до ${formattedDate}`);
				this.statusNode.classList.add('card__status_active');
				break;
			case 'closed':
				this.setText(this.statusNode, `Закрыто ${formattedDate}`);
				this.statusNode.classList.add('card__status_closed');
				break;
			case 'wait':
				this.setText(this.statusNode, `Откроется ${formattedDate}`);
				break;
			default:
				this.setText(this.statusNode, '');
				break;
		}
	}
}