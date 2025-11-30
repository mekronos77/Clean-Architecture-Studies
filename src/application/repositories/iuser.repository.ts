import type { TUser } from "../../domain/entities/user.entity";

export interface IUserRepositoryTDO {
  save(props: TUser): Promise<void>;
  findByEmail(email: string): Promise<TUser | null>;
  findById(id: string): Promise<TUser | null>;
  update(user: TUser): Promise<void>;
  delete(id: string): Promise<void>;
}
