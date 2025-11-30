import zod from "zod";

export const createUserSchema = zod
  .object({
    nickname: zod.string(),
    password: zod.string(),
    email: zod.email(),
    avatar: zod.url()
  })
  .strict();

export type ICreateUserDTO = zod.infer<typeof createUserSchema>;
