// TODO: do this hehec

import { CreateUser } from "./application/usecases/create.usecase";
import { LoginUser } from "./application/usecases/login.usecase";
import { UpdateUser } from "./application/usecases/update.usecase";
import { UserRepository } from "./infrastructure/database/drizzle/repositories/user.repository";

const create = new CreateUser(new UserRepository());

async function createUser(nickname: string, email: string, password: string) {
  await create.execute({ nickname: nickname, email: email, password: password });
}

const login = new LoginUser(new UserRepository());

console.log(await login.execute({ email: "a@gmail.com", password: "123" }));

const update = new UpdateUser(new UserRepository());
