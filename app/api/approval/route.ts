import prisma from "@/app/libs/prismadb";
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const allUsers = await prisma.approval.findMany();
    
    return NextResponse.json({ allUsers});
}