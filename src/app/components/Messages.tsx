"use client"

import { FC, useRef, useState } from 'react'
import { Message } from '../lib/validations/message';
import { cn, isDayChanged, isMinuteNotChanged } from '../lib/utils';
import { formatDistanceToNow, format, isToday, isYesterday } from "date-fns"
import MessageItem from './ui/MessageItem';
import { User } from 'next-auth';

interface MessagesProps {
  initialMessages: Message[];
  sessionId: string;
  sessionImg: string;
  partnerChatData: User;
}

const formatDateLabel = (timestamp: number) => {
  const date = new Date(timestamp);
  if (isToday(date)) {
    return 'Today';
  } else if (isYesterday(date)) {
    return 'Yesterday';
  } else {
    return format(date, 'dd-MM-yyyy');
  }
};

const Messages: FC<MessagesProps> = ({initialMessages, sessionId, sessionImg, partnerChatData}) => {
  const scrollDownRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<string>("");
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const formatTimestamp = (timestamp: number) => {
    return formatDistanceToNow(timestamp, {

    })
  }

  return (
    <div id="messages" className='flex h-full flex-1 flex-col-reverse gap-4 p-3 overflow-y-auto scrollbar-thumb-purple scrollbar-thumb-rounded scrollbar-track-purple-lighter scrollbar-w-2 scrolling-touch relative'>
      <div ref={scrollDownRef} />
      {messages.map((message, index ) => {
        const isCurrentUserMsg = message.senderId === sessionId;
        const prevMessage = index > 0 ? messages[index-1] : null;
        const isMinuteNotChangeForSameUser = prevMessage?.senderId === message?.senderId;
        const currDateLabel = formatDateLabel(message.timestamp);
        const nextMessage = messages?.[index+1]
        const nextDateLabel = nextMessage ? formatDateLabel(nextMessage.timestamp) : ""
        const dayChanged = currDateLabel !== nextDateLabel
        labelRef.current = currDateLabel;
        return (
          <div key={`${message.id} ${message.timestamp} ${index}`} className='mt-2' data-q={index}>
            {dayChanged && <div className='flex w-full justify-center sticky top-0 mb-4'>
              <span className='items-center rounded-xl bg-gray-900 text-gray-600 text-center text-xs px-2 py-1'>{currDateLabel}</span>
            </div>}
            <MessageItem
              isCurrentUserMsg={isCurrentUserMsg}
              isMinuteNotChangeForSameUser={isMinuteNotChangeForSameUser}
              message={message}
              partnerChatData={partnerChatData}
              sessionImg={sessionImg}
            />
          </div>
        )
      })}
    </div>
  )
}

export default Messages
