import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, username, password } = body;

  const hashedPassword = await bcrypt.hash(password, 12);

  const approval = await prisma.approval.create({
    data: {
      email,
      username,
      hashedPassword,
    },
  });

  return NextResponse.json(approval);
}
