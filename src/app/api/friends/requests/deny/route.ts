import { db } from "@/app/lib/db"
import { auth } from "@/auth";
import { fetchRedis } from "@/helpers/redis";
import type { NextApiRequest, NextApiResponse } from "next"
import { NextResponse } from "next/server";
import { json } from "stream/consumers";
import { ZodError, z } from "zod";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({message: "Unauthorized"}, {status: 401})
  }
  if (method === 'POST') {
    try {
      const body: {id: string | null} = await json(req.body) as {id: string | null};
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
  } else {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405})
  }
}
