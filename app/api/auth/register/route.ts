import { NextResponse } from "next/server";
import { RegisterSchema } from "@/schema/AuthSchema";
import { hashPassword } from "@/lib/hash";
import { getUserCollection } from "@/lib/db";

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = RegisterSchema.parse(body);

  const users = await getUserCollection();

  const existing = await users.findOne({ email: parsed.email });
  if (existing) {
    return NextResponse.json(
      { error: "Email already exists" },
      { status: 400 }
    );
  }

  const hashedPassword = await hashPassword(parsed.password);

  await users.insertOne({
    email: parsed.email,
    username: parsed.username,
    password: hashedPassword,
    createdAt: new Date(),
  });

  return NextResponse.json({ success: true });
}
