import type { User } from "../../domain/entities/user.entity"

export interface IUserRepositoryTDO {

    save(props: User): Promise<void>
    findByEmail(email: string): Promise<User | null>
    findById(id: string): Promise<User | null>
    update(user: User): Promise<void>
    delete(id: string): Promise<void>

}