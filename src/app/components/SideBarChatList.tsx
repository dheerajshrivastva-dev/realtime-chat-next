"use client"
import { User } from 'next-auth'
import { usePathname, useRouter } from 'next/navigation'
import { FC, useEffect, useState } from 'react'
import { chatHrefConstructor } from '../lib/utils'
import UserChatItem from './ui/UserChatItem'

interface SideBarChatListProps {
  friends: User[];
  sessionId: string;
}

const SideBarChatList: FC<SideBarChatListProps> = ({friends, sessionId}) => {
  const router = useRouter();
  const pathname = usePathname();

  const [unseenMessages, setUnseenMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (pathname?.includes('chat')) {
      setUnseenMessages((prev) => {
        return prev.filter(msg => !pathname.includes(msg.senderId))
      })
    }
  }, [pathname])

  return (
    <ul role="list" className='max-h-[25rem] overflow-y-auto -mr-2 space-y-1'>
      {friends.sort().map((friend) => {
        const unseenMessageForFriend = unseenMessages.filter((unseenMsg) => {
          return unseenMsg.id === friend.id;
        });
        const unseenMessageCount = unseenMessageForFriend?.length || 0;
        return <li key={friend.id}>
          <a className=' mt-auto flex items-center' href={`/dashboard/chat/${chatHrefConstructor(sessionId, friend.id || "")}`}>
            <UserChatItem friend={friend} unreadMessageCount={unseenMessageCount} latestMessage={unseenMessageForFriend?.[0]?.text}/>
          </a>
        </li>
      })}
    </ul>
  )
}

export default SideBarChatList
