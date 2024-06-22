"use client"
import { User2 } from "lucide-react";
import Link from "next/link";
import { FC, useState } from "react";

interface FriendRequestsSidebarOptionsProps {
  initialUnceenRequestCount: number;
  sessionId: string;
}

const FriendRequestsSidebarOptions: FC<
  FriendRequestsSidebarOptionsProps
> = ({initialUnceenRequestCount, sessionId}) => {
  const [unceenRequestCount, setUnceenRequestCount] = useState<number>(initialUnceenRequestCount)
  return (
    <Link href={"/dashboard/requests"} className="-mx-2 text-gray-200 hover:text-purple-500 hover:bg-gray-800 group flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold ">
      <div className="text-gray-400 border-gray-200 group-hover:border-purple-500 group-hover:text-purple-500 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-gray-900">
        <User2 className="h-4 w-4" />
      </div>
      <p className="truncate">Friend Request</p>
      {unceenRequestCount > 0 ? (
          <div className="rounded-full w-5 h-5 text-sm flex justify-center items-center text-white bg-purple-500 leading-3">
            {unceenRequestCount}
          </div>
        ) : <></>}
    </Link>
  );
};

export default FriendRequestsSidebarOptions;
