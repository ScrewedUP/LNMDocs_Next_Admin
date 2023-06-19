import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, username, hashedPassword } = body;

  const user = await prisma.user.create({
    data: {
      email,
      name : username,
      hashedPassword,
      emailAuthorized : true,
      role : 'ADMIN',
    },
  });
   const response = await prisma.approval.delete({
    where : {email : email,}
  });
  console.log(response)
  return NextResponse.json(user);
}
