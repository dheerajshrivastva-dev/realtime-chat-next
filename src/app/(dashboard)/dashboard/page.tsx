// import Logout from '@/app/components/log-out'
import { chatHrefConstructor } from '@/app/lib/utils'
import { Message } from '@/app/lib/validations/message'
import { auth } from '@/auth'
import { getFriendsByUserId } from '@/helpers/get-friends-by-userId'
import { fetchRedis } from '@/helpers/redis'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { FC } from 'react'

interface pageProps {
  
}

const page: FC<pageProps> = async ({}) => {
  const session = await auth()
  if (!session) notFound();
  const friends = await getFriendsByUserId(session.user?.id!)
  const friendsWithLatestMessage = await Promise.all(
    friends.map(async (friend) => {
      const [latestMessage] = await fetchRedis('zrange', `chat:${chatHrefConstructor(session.user?.id!, friend.id!)}:messages`, -1, -1) as string[];
      return {
        ...friend,
        latestMessage: JSON.parse(latestMessage) as Message
      }
    })
  )

  return (
    <div className='container py-12'>
      <h1 className='font-bols text-5xl mb-8'>Recent chats</h1>
      {friendsWithLatestMessage.length > 0 ? (
        friendsWithLatestMessage.map(friend => {
          return <div key={friend.id} className='relative bg-gray-950 border border-gray-900 p-3 rounded-md mb-3'>
            <div className='absolute right-4 inset-y-0 flex items-center'>
              <ChevronRight className='h-7 w-7 text-gray-400' />
            </div>
            <Link className='relative sm:flex' href={`/dashboard/chat/${chatHrefConstructor(session.user?.id!, friend.id!)}`}>
              <div className='mb-4 flex-shrink-0 sm:mb-0 sm:mr-4'>
                <div className="relative h-6 w-6">
                  <Image
                    fill
                    src={friend.image!}
                    alt={`${friend.image!} profile image`}
                    className='rounded-full'
                    referrerPolicy='no-referrer'
                  />
                </div>
              </div>
              <div>
                <h4 className='lext-lg font-semibold'>{friend.name}</h4>
                <p className='mt-1 max-w-md'>
                  <span className='text-gray-400'>
                    {friend.latestMessage.senderId === session.user?.id ? 'You ' : ""}
                  </span>
                  {friend.latestMessage.text}
                </p>
              </div>
            </Link>
          </div>
        })
      ) : (
        <p className="text-sm text-gray-400">Nothing to show here...</p>
      )}
    </div>
  )
}

export default page
