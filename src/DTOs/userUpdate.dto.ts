import z from "zod";

export const updateUserSchema = z.object({
  id: z.uuid(),
  confirmPassword: z.string(),
  nickname: z.string().optional(),
  avatar: z.url().optional(),
  email: z.string().optional(),
  password: z.string().optional()
});

export type TUpdateUserDTO = {
  id: string;
  avatar?: string;
  nickname?: string;
  email?: string;
  password?: string;
};
