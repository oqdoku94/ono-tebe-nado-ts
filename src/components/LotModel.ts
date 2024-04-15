import { ILotModel } from '../types/model';
import { Model } from './base/Model';
import { ILot, LotStatus } from '../types';
import dayjs from 'dayjs';

export class LotModel extends Model<ILot> implements ILotModel {
	about: string;
	_datetime: string;
	description: string;
	history: number[];
	id: string;
	image: string;
	minPrice: number;
	price: number;
	status: LotStatus;
	title: string;
	selfPrice?: number;
	private _date: Date;

	get datetime(): string {
		return this._datetime;
	}

	set datetime(value: string) {
		this._datetime = value;
		this._date = new Date(this.datetime);
	}



	getStateTitle(): string {
		if (this.status === 'closed')
			return 'Аукцион завершен';

		const currentTime = dayjs();
		const statusTime = dayjs(this.datetime);

		let seconds = statusTime.diff(currentTime, 'second');
		let minutes = Math.floor(seconds / 60);
		let hours = Math.floor(minutes / 60);
		const days = Math.floor(hours / 24);

		hours = hours - (days * 24);
		minutes = minutes - (days * 24 * 60) - (hours * 60);
		seconds = seconds - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60);


		return `${days}д ${hours}ч ${minutes} мин ${seconds} сек`;
	}

	getStateDescription(): string {
		if (this.status === 'wait')
			return;
	}

	isActive(): boolean {
		return this.status === 'active';
	}

	isSelfBidden(): boolean {
		return this.selfPrice && this.selfPrice > 0;
	}

	isWinner(): boolean {
		return this.status === 'closed' && this.isSelfBidden() && this.price === this.selfPrice;
	}

}