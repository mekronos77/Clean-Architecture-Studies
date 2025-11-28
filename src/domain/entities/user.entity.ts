import type { IUpdateUserDTO } from "../../DTOs/updateUser.dto"
export class User {
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
            this.avatar = "a"
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
