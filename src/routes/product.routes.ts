import { Router } from 'express';
import ProductController from '../controllers/product.controller';
import { check } from 'express-validator';
import fieldValidator from '../middlewares/fieldValidator.middleware';
import validateJWT from '../middlewares/validateJWT.middleware';
import validateByRole from '../middlewares/validateByRole.middleware';

const router = Router();
const productController = new ProductController();

router.get('/', productController.getAll);
router.post('/', [
	validateJWT,
	validateByRole,
	check('category', 'la cateogria es requerida').notEmpty(),
	check('description', 'la descripcion es requerida').notEmpty(),
	check('name', 'el nombre es requerido').notEmpty(),
	check('price', 'el precio no tiene un valor válido').notEmpty().isNumeric(),
	check('images', 'Se requiere minimo una imagen').notEmpty().isArray(),
	check('ingredients', 'Los ingredientes son obligatorios').notEmpty(),
	fieldValidator
],productController.create);

const persona: any = {nombre: "Ismael", apellido: "Malca"};

function customCheck(field: string, message: string){
	const value = persona[field];
	if(value){
		return;
	}
	return {
		campo: field,
		message,
	};
}

customCheck("nombre", "El nombre es requerido")

export default router;