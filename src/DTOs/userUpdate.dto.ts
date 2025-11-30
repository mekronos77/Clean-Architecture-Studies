import z from "zod";
import type { usersTable } from "../infrastructure/database/drizzle/schemas/user.schema";

export const updateUserSchema = z.object({
  id: z.uuid(),
  confirmPassword: z.string(),
  nickname: z.string().optional(),
  avatar: z.url().optional(),
  email: z.string().optional(),
  password: z.string().optional()
});

export interface IUpdateUser extends Partial<Omit<typeof usersTable.$inferInsert, "id">> {
  id: string;
}
