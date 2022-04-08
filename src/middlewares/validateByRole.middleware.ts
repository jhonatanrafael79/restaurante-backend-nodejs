import { NextFunction, Request, Response } from 'express';
import UserModel from '../models/User.model';
const validateByRole = async (req: Request, res: Response, next: NextFunction) => {
	try {
		//@ts-ignore
		const { uid } = req;
		const user = await UserModel.findById(uid);
		if(user.role.includes('admin')){
			return next();
		}
		throw {message: 'El usuario no es un admin'};
	} catch (error) {
		res.status(500).send({message: 'Ha ocurrido un problema o  no eres el rol correcto', error});
	}
}

export default validateByRole;