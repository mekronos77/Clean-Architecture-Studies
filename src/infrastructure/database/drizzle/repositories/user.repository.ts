import { eq } from "drizzle-orm";
import type { IUserRepositoryTDO } from "../../../../application/repositories/iuser.repository";
import { type TUser } from "../../../../domain/entities/user.entity";
import { db } from "../drizzle.database";
import { usersTable } from "../schemas/user.schema";

export class UserRepository implements IUserRepositoryTDO {
  async save(props: TUser): Promise<void> {
    if (!props.id) {
      props.id = crypto.randomUUID();
    }

    const values: typeof usersTable.$inferInsert = {
      email: props.email,
      password: props.password,
      nickname: props.nickname,
      avatar: props.avatar!,
      id: props.id // this can be a string or undefined
    };

    await db.insert(usersTable).values(values).$returningId();
  }

  async findByEmail(email: string): Promise<TUser | null> {
    const [user] = await db.select().from(usersTable).where(eq(usersTable.email, email));

    if (!user) {
      return null;
    }

    return user;
  }

  async findById(id: string): Promise<TUser | null> {
    const [user] = await db.select().from(usersTable).where(eq(usersTable.id, id));

    if (!user) {
      return null;
    }

    return user;
  }

  async update(user: Omit<TUser, "password">): Promise<void> {}

  async delete(id: string): Promise<void> {}
}
