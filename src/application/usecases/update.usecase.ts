import { HttpError } from "../../core/errors/httpError.error";
import type { IUpdateUser } from "../../dtos/userUpdate.dto";
import type { IUseCase } from "../../shared/iusecase.shared";
import type { IUserRepositoryTDO } from "../repositories/iuser.repository";

export class UpdateUser implements IUseCase<IUpdateUser, void> {
  constructor(private userRepository: IUserRepositoryTDO) {}
  public execute = async (props: IUpdateUser): Promise<void> => {
    const userExists = this.userRepository.findById(props.id);

    if (!userExists) throw new HttpError(404, "User do not exists.");

    await this.userRepository.update(props);
  };
}
