import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body : any = await request.json();
  const { email } = body;

  const user = await prisma.approval.delete({
    where : {email : email,}
  });

  return NextResponse.json(user);
}
