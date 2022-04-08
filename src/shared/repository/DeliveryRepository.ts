import { Schema } from 'mongoose'
export default interface DeliveryRepository {
	_id: string;
	user: Schema.Types.ObjectId;
	product: Schema.Types.ObjectId;
	comment?: string;
	state: number;
}