import { auth } from "@/auth";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FC, ReactNode } from "react";
import { Icon, Icons } from "@/app/components/Icons";
import Image from "next/image";
import Logout from "../components/log-out";
import FriendRequestsSidebarOptions from "../components/FriendRequestsSidebarOptions";
import { fetchRedis } from "@/helpers/redis";
import { User } from "next-auth";
import { getFriendsByUserId } from "@/helpers/get-friends-by-userId";
import SideBarChatList from "../components/SideBarChatList";
import MobileLayout from "../components/MobileLayout";

interface LayoutProps {
  children: ReactNode;
}

interface SidebarOptions {
  id: number;
  name: string;
  href: string;
  Icon: Icon;
}

const sidebarOptions: SidebarOptions[] = [
  {
    id: 1,
    name: "Add friend",
    href: "/dashboard/add",
    Icon: "UserPlus2",
  },
];

const Layout: FC<LayoutProps> = async ({ children }) => {
  const session = await auth();
  if (!session || !session.user?.id) notFound();

  const unseenRequestCount = (
    (await fetchRedis(
      "smembers",
      `user:${session?.user?.id}:incoming_friend_requests`
    )) as User[]
  ).length;

  const friends = await getFriendsByUserId(session.user?.id);
  return (
    <div className="w-full flex h-screen">
      <div className="md:hidden">
        <MobileLayout>
          <div className="flex flex-col h-full w-full grow gap-y-5 overflow-y-auto border-r border-gray-800 bg-gray-900 px-6">
            <Link href="/dashboard" className="flex h-16 shrink-0 items-center">
              <Icons.Logo className="h-8 w-auto text-pink-600" />
            </Link>
            {friends.length > 0 && (
              <div className="text-xs font-semibold leading-1 text-gray-300">
                {" "}
                Your chats
              </div>
            )}
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-2">
                <li>
                  <SideBarChatList
                    friends={friends}
                    sessionId={session.user?.id}
                  />
                </li>
                <li>
                  <div className="text-xs font-semibold leading-6 my-3 text-gray-300">
                    Overview
                  </div>
                  <ul role="list" className="-mx-2 mt-2 space-y-1">
                    {sidebarOptions.map((option) => {
                      const Icon = Icons[option.Icon];
                      return (
                        <li key={option.id}>
                          <Link
                            href={option.href}
                            className="text-gray-200 hover:text-pink-500 hover:bg-gray-800 group flex gap-3 rounded-md p-2 text-sm leading-6 font-semibold"
                          >
                            <span className="text-gray-400 border-gray-200 group-hover:border-pink-500 group-hover:text-pink-500 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-gray-900">
                              <Icon className="h-4 w-4" />
                            </span>
                            <span className="turncate">{option.name}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
                <li>
                  <FriendRequestsSidebarOptions
                    sessionId={session.user?.id || ""}
                    initialUnceenRequestCount={unseenRequestCount}
                  />
                </li>
                <li className="-mx-6 mt-auto flex items-center">
                  <div className="flex flex-1 items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 ">
                    <div className="relative h-8 w-8 bg-gray-900">
                      <Image
                        fill
                        referrerPolicy="no-referrer"
                        className="rounded-full"
                        src={session?.user?.image || ""}
                        alt="Your profile picture"
                      />
                      <span className="sr-only">Your profile</span>
                    </div>
                    <div className="flex flex-col">
                      <span aria-hidden="true" className=" text-gray-200">
                        {session?.user?.name || ""}
                      </span>
                      <span
                        className="text-xs text-gray-400"
                        aria-hidden="true"
                      >
                        {session?.user?.email || ""}
                      </span>
                    </div>
                  </div>
                  <Logout className="h-full aspect-square" />
                </li>
              </ul>
            </nav>
          </div>
        </MobileLayout>
      </div>
      <div className="hidden md:flex flex-col h-full w-full max-w-xs grow gap-y-5 overflow-y-auto border-r border-gray-800 bg-gray-900 px-6">
        <Link href="/dashboard" className="flex h-16 shrink-0 items-center">
          <Icons.Logo className="h-8 w-auto text-pink-600" />
        </Link>
        {friends.length > 0 && (
          <div className="text-xs font-semibold leading-1 text-gray-300">
            {" "}
            Your chats
          </div>
        )}
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-2">
            <li>
              <SideBarChatList friends={friends} sessionId={session.user?.id} />
            </li>
            <li>
              <div className="text-xs font-semibold leading-6 my-3 text-gray-300">
                Overview
              </div>
              <ul role="list" className="-mx-2 mt-2 space-y-1">
                {sidebarOptions.map((option) => {
                  const Icon = Icons[option.Icon];
                  return (
                    <li key={option.id}>
                      <Link
                        href={option.href}
                        className="text-gray-200 hover:text-pink-500 hover:bg-gray-800 group flex gap-3 rounded-md p-2 text-sm leading-6 font-semibold"
                      >
                        <span className="text-gray-400 border-gray-200 group-hover:border-pink-500 group-hover:text-pink-500 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-gray-900">
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="turncate">{option.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
            <li>
              <FriendRequestsSidebarOptions
                sessionId={session.user?.id || ""}
                initialUnceenRequestCount={unseenRequestCount}
              />
            </li>
            <li className="-mx-6 mt-auto flex items-center">
              <div className="flex flex-1 items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 ">
                <div className="relative h-8 w-8 bg-gray-900">
                  <Image
                    fill
                    referrerPolicy="no-referrer"
                    className="rounded-full"
                    src={session?.user?.image || ""}
                    alt="Your profile picture"
                  />
                  <span className="sr-only">Your profile</span>
                </div>
                <div className="flex flex-col">
                  <span aria-hidden="true" className=" text-gray-200">
                    {session?.user?.name || ""}
                  </span>
                  <span className="text-xs text-gray-400" aria-hidden="true">
                    {session?.user?.email || ""}
                  </span>
                </div>
              </div>
              <Logout className="h-full aspect-square" />
            </li>
          </ul>
        </nav>
      </div>
      <aside className="max-h-screen container py-16 md:py-12 w-full">
        {children}
      </aside>
    </div>
  );
};

export default Layout;
