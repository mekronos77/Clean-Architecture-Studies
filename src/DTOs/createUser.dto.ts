import type { IUserDTO } from "./user.dto";

export interface ICreateUserDTO extends Omit<IUserDTO, "id"> {}
