import { Router } from 'express';
import { check } from 'express-validator';
import PedidoController from '../controllers/pedido.controller';
import fieldValidator from '../middlewares/fieldValidator.middleware';
const router = Router();
const pedidoController = new PedidoController();

router.get('/', pedidoController.getAll);
router.post('/', [
	check('product', 'El campo product es requerido').notEmpty(),
	fieldValidator
], pedidoController.create)

export default router;