import { ILot, LotStatus } from './index';

export interface IStorage {
	lots: ILotModel[]
}

export interface ILotModel extends ILot {
	id: string;
	title: string;
	about: string;
	description?: string;
	image: string;
	status: LotStatus;
	datetime: string;
	price: number;
	minPrice: number;
	history?: number[];
	selfPrice?: number;
	getStateTitle() : string;
	getStateDescription() : string;
	isActive(): boolean;
	isSelfBidden(): boolean;
	isWinner(): boolean;
}
