import ChatInput from '@/app/components/ChatInput';
import Messages from '@/app/components/Messages';
import { Message, messageArraySchema } from '@/app/lib/validations/message';
import { auth } from '@/auth';
import { fetchRedis } from '@/helpers/redis';
import { User } from 'next-auth';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { FC } from 'react'
import { z } from 'zod';

interface pageProps {
  params: {
    chatId: string
  }
}

async function getChatMessages(chatId: string) {
  try {
    const results: string[] = await fetchRedis('zrange', `chat:${chatId}:messages`, 0, -1);
    const dbMessage = results.map((message) => JSON.parse(message) as Message);
    const reversedDbMessages = dbMessage.reverse();
    const message = messageArraySchema.parse(reversedDbMessages);
    return message;
  } catch (e) {
    if (e instanceof z.ZodError) {
      console.error('validatin failed', e.message);
    }
    console.error(e);
    return []
  }
}

const page: FC<pageProps> = async ({params}) => {
  const { chatId } = params;
  const session = await auth();
  if (!session) notFound();

  const { user } = session;

  const [userId1, userId2] = chatId.split("--")

  if(user?.id !== userId1 && user?.id !== userId2) {
    notFound()
  }

  const partnerChatId = user?.id === userId1 ? userId2 : userId1;
  
  const partnetChat = await fetchRedis('get', `user:${partnerChatId}`) as string;

  const partnerChatData = JSON.parse(partnetChat || "") as User

  const initialMessage = await getChatMessages(chatId)

  return (
    <main className='flex-1 flex flex-col justify-between h-full max-h-[calc(100vh-6rem)]'>
      <div className='flex sm:items-center justify-between py-3 border-b border-gray-800'>
        <div className='relative flex item-center space-x-4'>
          <div className='relative'>
            <div className='relative w-9 sm:w-12 h-9 sm:h-12'>
              <Image
                fill
                referrerPolicy='no-referrer'
                src={partnerChatData?.image || ""}
                alt={`${partnerChatData?.name} profile picture`}
                className='rounded-full'
              />
            </div>
          </div>
          <div className='flex flex-col leading-tight'>
            <div className='text-sm sm:text-xl flex items-center'>
              <span className='text-gray-300 mr-3 font-semibold'>
                {partnerChatData?.name}
              </span>
            </div>
            <span className='text-xs sm:text-sm text-gray-400'>
              {partnerChatData?.email}
            </span>
          </div>
        </div>
      </div>
      <Messages initialMessages={initialMessage} sessionId={session.user?.id || ""} sessionImg={session.user?.image || ""} partnerChatData={partnerChatData} chatId={chatId} />
      <ChatInput partnerChatData={partnerChatData} chatId={chatId} />
    </main>
  )
}

export default page
