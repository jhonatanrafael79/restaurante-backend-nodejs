import { Schema, model, Model, SchemaTypes } from 'mongoose';
import Delivery from '../shared/repository/DeliveryRepository';

const DeliverySchema = new Schema<Delivery, Model<Delivery>>({
	user: {
		type: SchemaTypes.ObjectId,
		ref: 'users',
		required: true
	},
	product: {
		type: SchemaTypes.ObjectId,
		ref: 'products',
		required: true
	},
	comment: {type: String, required: false},
	state: {
		type: Number,
		required: true,
		default: 1
	}
});

export default model('delivery', DeliverySchema);