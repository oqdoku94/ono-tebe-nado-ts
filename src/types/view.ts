import { ILotModel } from './model';
import { LotStatus } from './index';

export interface IView<T> {
	render(data?: Partial<T>): HTMLElement;
}

export interface ILotView extends IView<ILotModel> {
	id: string;
	title: string;
	about: string;
	image: string;
	status: LotStatus;
	datetime: string;
}

export interface ILotItemViewConstructor {
	new(container: HTMLElement, template: HTMLTemplateElement): ILotView;
}