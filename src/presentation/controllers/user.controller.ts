import type { NextFunction, Request, Response } from "express";
import { CreateUser } from "../../application/usecases/create.usecase";
import { GetUserById } from "../../application/usecases/getUserById.usecase";
import { UpdateUser } from "../../application/usecases/update.usecase";
import { HttpError } from "../../core/errors/httpError.error";
import { type ICreateUserDTO } from "../../dtos/createUser.dto";
import type { IUpdateUser } from "../../dtos/userUpdate.dto";
import { UserRepository } from "../../infrastructure/database/drizzle/repositories/user.repository";
import { Cryptography } from "../../infrastructure/services/hash.service";

export class UserController {
  userRepository = new UserRepository();

  getUserById = new GetUserById(this.userRepository);
  public createAccount = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // so serve pra enviar dados da requisição e validar

      const { email, password, avatar, nickname }: ICreateUserDTO = req.body;
      // TODO: makes avatar optional hehe
      const createUser = new CreateUser(this.userRepository);
      const createUserResult = await createUser.execute({ email, password, avatar, nickname });

      const user = await this.getUserById.execute(createUserResult.id);

      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };

  public async login(req: Request, res: Response, next: NextFunction) {}

  public async deleteAccount(req: Request, res: Response, next: NextFunction) {}

  public async getUser(req: Request, res: Response, next: NextFunction) {}

  public updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id, avatar, nickname, email, password }: IUpdateUser = req.body;

      const confirmPassword = req.body["confirmPassword"];

      const user = await this.getUserById.execute(id);

      if (!user) {
        throw new HttpError(404, "User do not exists.");
      }

      if (!Cryptography.compare({ value: confirmPassword, hash: user.password })) {
        throw new HttpError(401, "Invalid password");
      }

      const updateUser = new UpdateUser(this.userRepository);

      const updateUserObjectFormat: IUpdateUser = {
        id: id,
        nickname: nickname,
        avatar: avatar,
        email: email,
        password: password
      };

      await updateUser.execute(updateUserObjectFormat);
    } catch (error) {
      next(error);
    }
  };
}
