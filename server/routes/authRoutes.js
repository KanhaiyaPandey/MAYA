import { Router } from 'express';
import { register, login } from '../controllers/authControllers.js';
import { validateLoginInput, validateRegisterInput } from '../middlewares/validationMiddleware.js';
const router = Router();

router.post('/register', validateRegisterInput ,register);
router.post('/login',validateLoginInput, login);

export default router;