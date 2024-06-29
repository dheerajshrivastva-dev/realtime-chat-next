import { FC } from 'react'
import { chatHrefConstructor, cn } from '../lib/utils'
import toast, { type Toast } from 'react-hot-toast'
import Image from 'next/image';
import { ExtendedMessage } from '../lib/validations/message';
import { User } from 'next-auth';

interface UnseenChatToastProps {
  t: Toast;
  message: ExtendedMessage;
}

const UnseenChatToast: FC<UnseenChatToastProps> = ({t, message}) => {
  return (
    <div
      className={cn(
        'max-w-md w-full bg-gray-900 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-gray-700 ring-opacity-5',
        { 'animate-enter': t.visible, 'animate-leave': !t.visible }
      )}>
      <a
        onClick={() => toast.dismiss(t.id)}
        href={`/dashboard/chat/${chatHrefConstructor(message.receiverId, message.senderId)}`}
        className='flex-1 w-0 p-4'>
        <div className='flex items-start'>
          <div className='flex-shrink-0 pt-0.5'>
            <div className='relative h-10 w-10'>
              <Image
                fill
                referrerPolicy='no-referrer'
                className='rounded-full'
                src={message.senderImage!}
                alt={`${message.senderName!} profile picture`}
              />
            </div>
          </div>

          <div className='ml-3 flex-1'>
            <p className='text-sm font-medium text-gray-200'>{message.senderName!}</p>
            <p className='mt-1 text-sm text-gray-400'>{message.text}</p>
          </div>
        </div>
      </a>

      <div className='flex border-l border-gray-700'>
        <button
          onClick={() => toast.dismiss(t.id)}
          className='w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-pink-600 hover:text-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500'>
          Close
        </button>
      </div>
    </div>
  )
}

export default UnseenChatToast
