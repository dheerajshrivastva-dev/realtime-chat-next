import { db } from "@/app/lib/db"
import { pusherServer } from "@/app/lib/pusher";
import { toPusherKey } from "@/app/lib/utils";
import { addFriendValidator } from "@/app/lib/validations/add-friend"
import { auth } from "@/auth";
import { fetchRedis } from "@/helpers/redis";
import { NextResponse } from "next/server";
import { json } from "stream/consumers";
import { ZodError } from "zod";

export async function POST(req: Request, res: Response) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({message: "Unauthorized"}, {status: 401})
    }
    const body: {email: string | null} = await req.json() as {email: string | null};
    const { email: emailToAdd} = addFriendValidator.parse({email: body.email})

    const idToAdd = await fetchRedis('get', `user:email:${emailToAdd}`) as string | null
    if (idToAdd) {
      //region adding self
      if (idToAdd === session.user.id) {
        return NextResponse.json({message: 'You can not add yourself as a friend'}, { status: 400})
      }
      //endregion

      //region friend request sent already
      const isFriendRequestSentAlready = await fetchRedis('sismember', `user:${idToAdd}:incoming_friend_requests`, session.user.id) as 0 | 1
      if (isFriendRequestSentAlready) {
        return NextResponse.json({message: 'Friend request sent already'}, { status: 400})
      }
      //endregion

      //region already friend
      const isAlreadyAdded = await fetchRedis('sismember', `user:${idToAdd}:friends`, session.user.id) as 0 | 1
      if (isAlreadyAdded) {
        return NextResponse.json({message: 'Already friends'}, { status: 400})
      }
      //endregion

      //region valid request, send friend request
      // handle realtimeUpdate and push this event to all sunscribed clients
      console.debug("trigger")
      pusherServer.trigger(
        toPusherKey(`user:${idToAdd}:incoming_friend_requests`),
        'incoming_friend_requests',
        {
          id: session.user.id!,
          email: session.user.email!,
          image: session.user.image!,
          name: session.user.name!,
        }
      )
      db.sadd(`user:${idToAdd}:incoming_friend_requests`, session.user.id)
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