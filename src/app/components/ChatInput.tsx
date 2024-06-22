"use client"

import { User } from 'next-auth'
import { FC, useRef, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import Button from './ui/Button'
import { Send, SendHorizonal } from 'lucide-react'
import axios from 'axios'

interface ChatInputProps {
  partnerChatData: User;
  chatId: string;
}

const ChatInput: FC<ChatInputProps> = ({partnerChatData, chatId}) => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [isSending, setisSending] = useState<boolean>(false)
  const [input, setInput] = useState<string>("");
  const sendMessage = async () => {
    setisSending(true)
    try {
      await axios.post('/api/message/send', {text: input, chatId})
      // await new Promise((resolve) => setTimeout(resolve, 1000))
      setInput('')
      
    } catch {
      console.error("Something went wrong")
    } finally {
      setisSending(false)
      textAreaRef.current?.focus()
    }
  }
  return (
    <div className='border-t border-gray-800 px-4 pt-4 mb-2 sm:mb-0'>
      <div className='relative flex-1 overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-700 focus-within:ring-2 focus-within::ring-purple-600'>
        <TextareaAutosize
          ref={textAreaRef}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()
              sendMessage()
            }
          }}
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Message ${partnerChatData?.name}`}
          className='block w-full resize-none border-0 bg-transparent text-white placeholder:text-gray-400 focus:ring-0 sm:py-1.5 sm:text-sm sm:leading-6'
        />
        <div
          onClick={() => textAreaRef.current?.focus()}
          className='py-2'
          aria-hidden="true"
        >
          <div className='py-px'>
            <div className='h-9'/>
          </div>
        </div>
        <div className='absolute right-0 bottom-0 flex justify-between py-2 pl-2 pr-2'>
          <div className='flex shrink-0'>
            <Button isLoading={isSending} onClick={sendMessage} type='submit' ><SendHorizonal/></Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatInput
