import type { IUserDTO } from "./user.dto";

export type ICreateUserDTO = Omit<IUserDTO, 'id'>
