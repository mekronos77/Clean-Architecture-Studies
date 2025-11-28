import type { IUserDTO } from "./user.dto";

export interface IUpdateUserDTO extends Partial<Omit<IUserDTO, 'id' | 'password'>> {
    id: string
}

