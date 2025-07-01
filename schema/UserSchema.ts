import { z } from "zod";

export const UserSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(1),
  email: z.string().email(),
  emailVerified: z.date().nullable().optional(),
  image: z.string().url().nullable().optional(),
});
