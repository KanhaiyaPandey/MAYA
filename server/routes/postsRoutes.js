import { Router } from 'express';
import { getAllPosts, createPost} from '../controllers/postsControllers.js';
const router = Router();

router.route('/').get(getAllPosts).post( createPost );

export default router;