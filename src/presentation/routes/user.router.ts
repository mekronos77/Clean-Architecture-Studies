import { Router } from "express";
import { createUserSchema } from "../../dtos/createUser.dto";
import { UserController } from "../controllers/user.controller";
import { zodValidation } from "../middlewares/zod.validation";

const router = Router();

const userController = new UserController();

router.route("/user").post(zodValidation(createUserSchema), userController.createAccount);

export default router;
