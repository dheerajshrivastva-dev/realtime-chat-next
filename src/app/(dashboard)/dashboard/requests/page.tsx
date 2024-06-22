import FriendRequests from '@/app/components/FriendRequests';
import DashboardSkeleton from '@/app/components/ui/skeletons';
import { auth } from '@/auth'
import { fetchRedis } from '@/helpers/redis';
import { User } from 'next-auth';
import { notFound } from 'next/navigation';
import { FC, Suspense } from 'react'

const page = async () => {
  const session = await auth();
  if (!session) notFound();

  // ids of people who sent current logged in user a friend request
  const incomingsenderIds = (await fetchRedis('smembers', `user:${session.user?.id}:incoming_friend_requests`) as string[])
  
  const incomingFriendRequests = await Promise.all(
    incomingsenderIds.map( async (senderId) => {
      const sender = await fetchRedis('get', `user:${senderId}`) as string | null
      return sender ? JSON.parse(sender) as User : {};
    })
  )
  return (
    <main>
      <h1 className='font-bold text-5xl mb-8'>Friend requests</h1>
      <div className='flex flex-col gap-4'>
      <Suspense fallback={<DashboardSkeleton />}>
        <FriendRequests sessionId={session.user?.id || ""} initialFriendRequests={incomingFriendRequests}/>
      </Suspense>
      </div>
    </main>
  )
}

export default page