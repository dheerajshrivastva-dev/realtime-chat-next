import { User } from 'next-auth'
import Image from 'next/image'
import { FC } from 'react'

interface UserChatItemProps {
  friend: User;
  latestMessage?: string;
  unreadMessageCount: number;
}

const UserChatItem: FC<UserChatItemProps> = ({friend, latestMessage, unreadMessageCount}) => {
  return (
    <div className='flex flex-1 items-center gap-x-3 text-sm font-semibold leading-6 group hover:bg-gray-800 p-2 rounded-md w-full'>
      <div className='h-8 w-8 border grid place-items-center rounded-md group-hover:border-pink-600 shrink-0 transition-all'>
        <div className='relative h-6 w-6 bg-gray-900'>
          <Image
            fill
            referrerPolicy='no-referrer'
            className='rounded-md'
            src={friend?.image || ''}
            alt={`${friend?.name}'s profile picture`}
          />
        </div>
      </div>
      <div className='flex flex-col flex-1 overflow-hidden transition-all'>
        <span aria-hidden="true" className=' text-gray-200 group-hover:text-pink-600 truncate'>{friend?.name || ""}</span>
        <span className='sr-only'>
          {friend?.email || ""}
        </span>
        {latestMessage && <span aria-label="latest-message" className='text-gray-400 text-xs truncate'>{latestMessage || ""}</span>}
      </div>
      {unreadMessageCount > 0 ? (
        <div className="rounded-full w-5 h-5 text-xs shrink-0 flex justify-center items-center text-white bg-pink-500 leading-3">
          {unreadMessageCount}
        </div>
      ) : <></>}
    </div>
  )
}

export default UserChatItem
