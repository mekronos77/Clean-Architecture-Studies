// TODO: do this hehe

import { UpdateUser } from "./application/usecases/update.usecase";
import { UserRepository } from "./domain/repositories/user.repository";


const update = new UpdateUser(new UserRepository)

await update.execute({id: "05f185ae-ac93-4cc1-bf4e-bb790999b5af", nickname: "testando"})

