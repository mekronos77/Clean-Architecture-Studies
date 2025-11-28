// TODO: do this hehec

import { CreateUser } from "./application/usecases/create.usecase";
import { UserRepository } from "./infrastructure/database/drizzle/repositories/user.repository";

const create = new CreateUser(new UserRepository)

async function createUser(nickname: string, email: string, password: string) {
    await create.execute({ nickname: nickname, email: email, password: password})
}
