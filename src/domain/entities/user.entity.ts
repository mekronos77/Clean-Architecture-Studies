import type { IUpdateUserDTO } from "../../DTOs/updateUser.dto"
import type { IUserDTO } from "../../DTOs/user.dto"

export class User implements IUserDTO {
    constructor(
        public email: string,
        public password: string,
        public nickname: string,
        public avatar?: string,
        public id?: string,
    ) {
        if (id === undefined) {
            this.id = crypto.randomUUID()
        }
        if (avatar === undefined) {
            this.avatar = "none"
        }

    }

    update(props: Omit<IUpdateUserDTO, 'id'>) {
        Object.entries(props).forEach(([key, value]) => {
            if (value !== undefined) {
                (this as any)[key] = value
            }
        })
    }


}

export function newUserEntityCaller(props: { email: string, password: string, nickname: string, avatar?: string, id?: string}) {
    return new User(props.email, props.password, props.nickname, props.avatar,    props.id)
}
