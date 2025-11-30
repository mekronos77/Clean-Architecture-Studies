import { HttpError } from "../../core/errors/httpError.error";
import type { TUser } from "../../domain/entities/user.entity";
import type { ICreateUserDTO } from "../../dtos/createUser.dto";

import { Cryptography } from "../../infrastructure/services/hash.service";
import type { IUseCase } from "../../shared/iusecase.shared";
import type { IUserRepositoryTDO } from "../repositories/iuser.repository";

export class CreateUser implements IUseCase<ICreateUserDTO, { id: string }> {
  constructor(private userRepository: IUserRepositoryTDO) {}
  public async execute(props: ICreateUserDTO) {
    const passwordHashed = await Cryptography.hash({ text: props.password });
    const user: TUser = {
      email: props.email,
      password: passwordHashed,
      nickname: props.nickname,
      avatar: props.avatar,
      id: crypto.randomUUID() // could be undefined
    };

    const emailExists = await this.userRepository.findByEmail(user.email);

    if (emailExists) {
      throw new HttpError(401, "Email already exists, try another one.");
    }

    await this.userRepository.save(user);

    return { id: user.id! };
  }
}
