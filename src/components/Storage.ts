import { ILotModel, IStorage } from '../types/model';
import { IEvents } from './base/events';


class Storage implements IStorage {
	protected _lots: ILotModel[];

	constructor(protected events: IEvents) {

	}

	set lots(lots: ILotModel[]) {
		this._lots = lots;
		this.events.emit('lots:changed', this._lots);
	}

}