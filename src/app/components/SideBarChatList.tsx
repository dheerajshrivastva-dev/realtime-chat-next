"use client"
import { User } from 'next-auth'
import { usePathname, useRouter } from 'next/navigation'
import { FC, useEffect, useState } from 'react'
import { chatHrefConstructor, toPusherKey } from '../lib/utils'
import UserChatItem from './ui/UserChatItem'
import { pusherClient } from '../lib/pusher'
import { toast } from 'react-hot-toast'
import UnseenChatToast from './UnseenChatToast'
import { ExtendedMessage } from '../lib/validations/message'
import Link from 'next/link'

interface SideBarChatListProps {
  friends: User[];
  sessionId: string;
}


const SideBarChatList: FC<SideBarChatListProps> = ({friends, sessionId}) => {
  const router = useRouter();
  const pathname = usePathname();

  const [unseenMessages, setUnseenMessages] = useState<ExtendedMessage[]>([]);

  useEffect(() => {
    if (pathname?.includes('chat')) {
      setUnseenMessages((prev) => {
        return prev.filter(msg => !pathname.includes(msg.senderId))
      })
    }
  }, [pathname])

  useEffect(() => {
    pusherClient.subscribe(toPusherKey(`user:${sessionId}:chats`))

    const unseenMessageHandler = (msg: ExtendedMessage) => {
      // use toast notification
      const chatIdPath = `/dashboard/chat/${chatHrefConstructor(sessionId, msg.senderId!)}`;
      const shouldNotify = pathname !== chatIdPath;
      if (!shouldNotify) return;
      toast.custom((t) => (
        <UnseenChatToast t={t} message={msg} />
      ))
      setUnseenMessages((prev) => [msg, ...prev])
    }

    pusherClient.bind("new_messages", unseenMessageHandler);

    return () => {
      pusherClient.unsubscribe(toPusherKey(`user:${sessionId}:chats`))
      pusherClient.unbind("new_messages", unseenMessageHandler);
    }
  }, [sessionId, pathname])

  return (
    <ul role="list" className='max-h-[25rem] overflow-y-auto -mr-2 -mx-2 space-y-1'>
      {friends.sort().map((friend) => {
        const unseenMessageForFriend = unseenMessages.filter((unseenMsg) => {
          return unseenMsg.senderId === friend.id;
        });
        const unseenMessageCount = unseenMessageForFriend.length;

        return <li key={friend.id}>
          <Link className=' mt-auto flex items-center' href={`/dashboard/chat/${chatHrefConstructor(sessionId, friend.id || "")}`}>
            <UserChatItem friend={friend} unreadMessageCount={unseenMessageCount} latestMessage={unseenMessageForFriend?.[0]?.text}/>
          </Link>
        </li>
      })}
    </ul>
  )
}

export default SideBarChatList
