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
    const { id: idToAdd} = z.object({id: z.string()}).parse({id: body.id})
    if (idToAdd) {
      //region adding self
      if (idToAdd === session.user.id) {
        return NextResponse.json({message: 'You can not accept yourself friend request'}, { status: 400})
      }
      //endregion

      //region already friend
      const isAlreadyFriends = await fetchRedis('sismember', `user:${idToAdd}:friends`, session.user.id) as 0 | 1
      if (isAlreadyFriends) {
        return NextResponse.json({message: 'Already friends'}, { status: 400})
      }
      //endregion

      //region valid friend request
      const aValidRequest = await fetchRedis('sismember', `user:${session.user?.id}:incoming_friend_requests`, idToAdd) as 0 | 1
      if (aValidRequest) {
        console.debug(aValidRequest, "aValidRequest")
        // add to friend
        db.sadd(`user:${session.user?.id}:friends`, idToAdd)
        db.sadd(`user:${idToAdd}:friends`, session.user?.id)
        // remove friend request
        await db.srem(`user:${session.user?.id}:incoming_friend_requests`, idToAdd)
      } else {
        return NextResponse.json({message: 'Invalid request'}, { status: 400})
      }
      //endregion
      
      return NextResponse.json(null, { status: 200})
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
