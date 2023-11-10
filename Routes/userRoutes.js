import { Router } from 'express';
import { currentUser, following, getUserById, updatetUser } from '../controllers/userControllers.js';
const router = Router();


router.route("/current-user").get(currentUser).patch(updatetUser);
router.route('/:id').get(getUserById).put( following );


export default router;