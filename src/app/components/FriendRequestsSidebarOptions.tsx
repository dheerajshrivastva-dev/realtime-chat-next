"use client"
import { User2 } from "lucide-react";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { pusherClient } from "../lib/pusher";
import { toPusherKey } from "../lib/utils";
import { User } from "next-auth";

interface FriendRequestsSidebarOptionsProps {
  initialUnceenRequestCount: number;
  sessionId: string;
}

const FriendRequestsSidebarOptions: FC<
  FriendRequestsSidebarOptionsProps
> = ({initialUnceenRequestCount, sessionId}) => {
  const [unceenRequestCount, setUnceenRequestCount] = useState<number>(initialUnceenRequestCount)

  useEffect(() => {
    pusherClient.subscribe(toPusherKey(`user:${sessionId}:incoming_friend_requests`))

    const friendRequestHandler = (user: User) => {
      console.debug("user", user);
      setUnceenRequestCount((prev) => prev + 1)
    }
    console.debug("useeffect called")

    pusherClient.bind("incoming_friend_requests", friendRequestHandler);

    return () => {
      pusherClient.unsubscribe(toPusherKey(`user:${sessionId}:incoming_friend_requests`))
      pusherClient.unbind("incoming_friend_requests", friendRequestHandler);
    }
  }, [sessionId])
  return (
    <Link href={"/dashboard/requests"} className="-mx-2 text-gray-200 hover:text-pink-500 hover:bg-gray-800 group flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold ">
      <div className="text-gray-400 border-gray-200 group-hover:border-pink-500 group-hover:text-pink-500 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-gray-900">
        <User2 className="h-4 w-4" />
      </div>
      <p className="truncate">Friend Request</p>
      {unceenRequestCount > 0 ? (
          <div className="rounded-full w-5 h-5 text-sm flex justify-center items-center text-white bg-pink-500 leading-3">
            {unceenRequestCount}
          </div>
        ) : <></>}
    </Link>
  );
};

export default FriendRequestsSidebarOptions;
