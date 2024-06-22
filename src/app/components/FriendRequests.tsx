"use client"
import axios from 'axios';
import { CheckCircle2, UserPlus2, X } from 'lucide-react';
import { User } from 'next-auth';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react'
import Button from './ui/Button';

interface FriendRequestsProps {
  initialFriendRequests: User[];
  sessionId: string;
}

const FriendRequests: FC<FriendRequestsProps> = ({initialFriendRequests, sessionId}) => {
  const router = useRouter()
  const [friendRequest, setFriendRequest] = useState<User[]>(initialFriendRequests);
  const [acceptFriendRequestLoading, setAcceptFriendRequestLoading] = useState<boolean>(false);
  const [denyFriendRequestLoading, setDenyFriendRequestLoading] = useState<boolean>(false);

  const handleAcceptFriendRequest = async (senderId: string) => {
    if (!senderId) {
      return
    }
    setAcceptFriendRequestLoading(true)
    try {
      await axios.post('/api/friends/requests/accept', {id: senderId})
      setFriendRequest((prev) => {
        return prev.filter(request => request.id !== senderId)
      })
      router.refresh()
    } catch (e) {
      console.debug(e)
    } finally {
      setAcceptFriendRequestLoading(false)
    }
  }

  const handleDenyRriendRequest = async (senderId: string) => {
    if (!senderId) {
      return
    }
    setDenyFriendRequestLoading(true)
    try {
      await axios.post('/api/friends/requests/deny', {id: senderId})
      setFriendRequest((prev) => {
        return prev.filter(request => request.id !== senderId)
      })
      router.refresh()
    } catch (e) {
      console.debug(e)
    } finally {
      setDenyFriendRequestLoading(false)
    }
  }

  return (
    <>
    {friendRequest.length > 0 ? friendRequest.map(request => {
      return (
        <div key={request.id} className='flex gap-4 items-center bg-gray-900 rounded-sm p-4'>
          <UserPlus2 className='text-gray-200' />
          <div className='flex gap-4 items-center flex-1'>
            <div className='relative h-8 w-8 bg-transparent'>
               <Image
                src={request.image || ""}
                alt="profile image"
                fill
                referrerPolicy='no-referrer'
                className='rounded-full'
              />
            </div>
            <div className='flex flex-col'>
              <span aria-hidden="true" className=' text-gray-200'>{request?.name || ""}</span>
              <span className='text-xs text-gray-400' aria-hidden="true">
                {request?.email || ""}
              </span>
            </div>
          </div>
          <Button
            area-label="accept friend request"
            className='w-8 h-8 bg-purple-500 hover:bg-purple-700 hover:shadow-md grid place-items-center rounded-full transition p-0 m-0'
            onClick={() => handleAcceptFriendRequest(request?.id || "")}
            isLoading={acceptFriendRequestLoading}
          >
            {!acceptFriendRequestLoading && <CheckCircle2 className='font-semibold text-white w-3/4 h-3/4' />}
          </Button>
          <Button
            area-label="deny friend request"
            className='w-8 h-8 bg-red-500 hover:bg-red-700 hover:shadow-md grid place-items-center rounded-full transition p-0 m-0'
            onClick={() => handleDenyRriendRequest(request?.id || "")}
            isLoading={denyFriendRequestLoading}
          >
            {!denyFriendRequestLoading && <X className='font-semibold text-white w-3/4 h-3/4' />}
          </Button>
        </div>
      )
    }) : <p className='text-sm text-zinc-300'>Nothing to show here...</p>}
    </>
  )
}

export default FriendRequests
