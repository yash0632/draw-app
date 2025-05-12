import express,{Router} from 'express'
const router:Router = express.Router();
import chatController from '../controllers/chat.controller';
import validate from '../utils/validate';
import { chatSchema } from '../../../../packages/common/dist/schema/chat.schema';
import { jwtMiddleWareFunc } from '../middleware/auth';

router.get('/:roomId',
    jwtMiddleWareFunc,
    validate(chatSchema),
    chatController.GetChats);

export default router;