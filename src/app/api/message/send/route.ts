import { db } from "@/app/lib/db"
import { pusherServer } from "@/app/lib/pusher";
import { toPusherKey } from "@/app/lib/utils";
import { messageSchema } from "@/app/lib/validations/message";
import { auth } from "@/auth";
import { fetchRedis } from "@/helpers/redis";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";
import { ZodError, z } from "zod";

export async function POST(req: Request, res: Response) {
 
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({message: "Unauthorized"}, {status: 401})
    }

    const body = await req.json() as {chatId: string, text: string};
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
      const message = messageSchema.parse(messageData)
      //#region realtime block
      // notify all connected chat room clients
      pusherServer.trigger(toPusherKey(`chat:${chatId}`), "incoming_messages", message)
      // notify sidebar for unseen message
      pusherServer.trigger(toPusherKey(`user:${friendId}:chats`), "new_messages", {
        ...message,
        senderImage: session.user.image!,
        senderName: session.user.name!
      })
      //#endregion
      await db.zadd(`chat:${body.chatId}:messages`, {
        score: timestamp,
        member: JSON.stringify(message)
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
}
