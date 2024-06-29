import { db } from "@/app/lib/db"
import { auth } from "@/auth";
import { fetchRedis } from "@/helpers/redis";
import { NextResponse } from "next/server";
import { ZodError, z } from "zod";

export async function POST(req: Request, res: Response) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({message: "Unauthorized"}, {status: 401})
    }
    const body: {id: string | null} = await req.json() as {id: string | null};
    const { id: idToDeny} = z.object({id: z.string()}).parse({id: body.id})
    if (idToDeny) {
      await db.srem(`user:${session.user?.id}:incoming_friend_requests`, idToDeny)
      
      return NextResponse.json("ok", { status: 200})
    } else {
      return NextResponse.json({message: 'User not found'}, { status: 400})
    }
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({message: 'Invalid request payload'}, { status: 422})
    }
    return NextResponse.json({message: 'Invalid request'}, { status: 400})
  }
}
