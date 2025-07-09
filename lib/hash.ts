import bcrypt from "bcryptjs";

export const hashPassword = async (pass: string) => await bcrypt.hash(pass, 10);
export const verifyPassword = async (plain: string, hash: string) =>
  await bcrypt.compare(plain, hash);
