import type { NextFunction, Request, Response } from "express";
import { CreateUser } from "../../application/usecases/create.usecase";
import { GetUserById } from "../../application/usecases/getUserById.usecase";
import { type ICreateUserDTO } from "../../dtos/createUser.dto";
import { UserRepository } from "../../infrastructure/database/drizzle/repositories/user.repository";

export class UserController {
  userRepository = new UserRepository();
  public createAccount = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // so serve pra enviar dados da requisição e validar

      const { email, password, avatar, nickname }: ICreateUserDTO = req.body;
      // TODO: makes avatar optional hehe
      const createUser = new CreateUser(this.userRepository);

      const getUserById = new GetUserById(this.userRepository);
      const createUserResult = await createUser.execute({ email, password, avatar, nickname });

      const user = await getUserById.execute(createUserResult.id);

      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };

  public async login(req: Request, res: Response, next: NextFunction) {}

  public async deleteAccount(req: Request, res: Response, next: NextFunction) {}

  public async getUser(req: Request, res: Response, next: NextFunction) {}

  public async updateUser(req: Request, res: Response, next: NextFunction) {}
}
