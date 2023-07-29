
import express from 'express';
import {USER_ROUTES} from "../../../shared/utils/app-constants.js";

import UserController from '../controllers/user-controller.js';
const userRoutes = express.Router();

userRoutes.post(USER_ROUTES.ADD,UserController.addUser);
userRoutes.get(USER_ROUTES.View_User,UserController.getAllUser );
 userRoutes.delete(USER_ROUTES.DEL_user,UserController.deleteUser);
userRoutes.put(USER_ROUTES.Update_user,UserController.updateUser);
export default userRoutes;
