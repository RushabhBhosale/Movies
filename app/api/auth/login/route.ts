import { NextResponse } from "next/server";
import { LoginSchema } from "@/schema/AuthSchema";
import { getUserCollection } from "@/lib/db/db";
import { verifyPassword } from "@/lib/hash";
import { signToken } from "@/lib/jwt";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = LoginSchema.parse(body);

    const users = await getUserCollection();
    const user = await users.findOne({ email: parsed.email });
    if (!user)
      return NextResponse.json({ error: "Invalid creds" }, { status: 401 });

    const valid = await verifyPassword(parsed.password, user.password);
    if (!valid)
      return NextResponse.json({ error: "Invalid creds" }, { status: 401 });

    const token = signToken({ id: user._id, email: user.email });

    const res = NextResponse.json({ success: true });

    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return res;
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
