import { db } from "@/app/lib/db"
import { auth } from "@/auth";
import { fetchRedis } from "@/helpers/redis";
import { subDays } from "date-fns";
import { nanoid } from "nanoid";
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
      const body = await json(req.body) as {chatId: string, text: string};
      const { chatId, text} = z.object({chatId: z.string(), text: z.string()}).parse(body);
      const [userId1, userId2] = chatId?.split("--");
      if (session.user?.id !== userId1 && session.user?.id !== userId2) {
        return NextResponse.json({message: "Unauthorized"}, {status: 401})
      }

      const friendId = session.user?.id === userId1 ? userId2 : userId1;
      const isFriend = await fetchRedis('sismember', `user:${session.user?.id}:friends`, friendId) as 0 | 1
      if (isFriend) {
        // const timestamp = new Date(subDays(Date.now(),  1)).getTime() ;
        const timestamp = Date.now();
        const messageData: Message = {
          id: nanoid(),
          senderId: session.user?.id,
          receiverId: friendId,
          timestamp,
          text
        }
        await db.zadd(`chat:${body.chatId}:messages`, {
          score: timestamp,
          member: JSON.stringify(messageData)
        })
        
        return NextResponse.json("ok", { status: 200})
      } else {
        return NextResponse.json({message: 'Unauthorized'}, { status: 401})
      }
    } catch (error) {
      if (error instanceof ZodError) {
        return NextResponse.json({message: 'Invalid request payload'}, { status: 500})
      }
      return NextResponse.json({message: 'Invalid request'}, { status: 500})
    }
  } else {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405})
  }
}
