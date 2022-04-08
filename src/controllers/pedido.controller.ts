import { Request, Response } from "express";
import DeliveryModel from "../models/Delivery.model";
import jwt from 'jsonwebtoken';
import { io } from "..";

export default class PedidoController {
	async getAll(_: Request, res: Response) {
		try {
			const data = await DeliveryModel.find().populate('product');
			res.send({data})
		} catch (error) {
			res.status(500).send({error, message: 'Ha ocurrido un error'})
		}
	}

	async create(req: Request, res: Response) {
		try {
			const {product, comment } = req.body as any; 
			const { uid }: any = jwt.decode(req.headers.authorization!);
			
			const pedido = new DeliveryModel({user: uid, product, comment});
			await pedido.save();
			io.emit('create-pedido', pedido);
			res.send({pedido});
		} catch (error) {
			res.status(500).send({error, message: 'Ha ocurrido un error'})
		}
	}
}