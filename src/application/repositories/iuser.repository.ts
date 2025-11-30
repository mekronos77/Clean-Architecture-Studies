import type { TUser } from "../../domain/entities/user.entity";
import type { IUpdateUser } from "../../dtos/userUpdate.dto";

export interface IUserRepositoryTDO {
  save(props: TUser): Promise<void>;
  findByEmail(email: string): Promise<TUser | null>;
  findById(id: string): Promise<TUser | null>;
  update(user: IUpdateUser): Promise<void>;
  delete(id: string): Promise<void>;
}
