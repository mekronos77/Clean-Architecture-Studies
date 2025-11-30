import { Router } from "express";
import { createUserSchema } from "../../dtos/createUser.dto";
import { updateUserSchema } from "../../dtos/userUpdate.dto";
import { UserController } from "../controllers/user.controller";
import { zodValidation } from "../middlewares/zod.validation";

const router = Router();

const userController = new UserController();

router.route("/user").post(zodValidation(createUserSchema), userController.createAccount);
router.route("/user/update").put(zodValidation(updateUserSchema), userController.updateUser);

export default router;
