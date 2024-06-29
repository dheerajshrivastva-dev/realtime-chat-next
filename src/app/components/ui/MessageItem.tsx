import { cn } from "@/app/lib/utils";
import { Message } from "@/app/lib/validations/message";
import { format } from "date-fns";
import { User } from "next-auth";
import Image from "next/image";
import { FC } from "react";

interface MessageItemProps {
  isCurrentUserMsg: boolean;
  isMinuteNotChangeForSameUser: boolean;
  message: Message;
  sessionImg: string;
  partnerChatData: User;
}

const MessageItem: FC<MessageItemProps> = ({
  message,
  isCurrentUserMsg,
  isMinuteNotChangeForSameUser,
  sessionImg,
  partnerChatData
}) => {
  return (
    <div className="chat-message">
      <div
        className={cn("flex items-end", {
          "justify-end": isCurrentUserMsg,
        })}
      >
        <div
          className={cn("flex flex-col space-y-2 text-base max-w-xs mx-2", {
            "order-1 items-end": isCurrentUserMsg,
            "order-2 items-start": !isCurrentUserMsg,
          })}
        >
          <span
            className={cn("px-4 py-2 rounded-lg inline-block", {
              "bg-pink-600 text-white": isCurrentUserMsg,
              "bg-gray-800 text-gray-200": !isCurrentUserMsg,
              "rounded-br-none":
                !isMinuteNotChangeForSameUser && isCurrentUserMsg,
              "rounded-bl-none":
                !isMinuteNotChangeForSameUser && !isCurrentUserMsg,
            })}
          >
            {message?.text}{" "}
            <span className="ml-2 text-xs text-gray-300">
              {format(message.timestamp, "p")}
            </span>
          </span>
        </div>
        <div className={cn('relative w-6 h-6 shrink-0', {
          'order-2': isCurrentUserMsg,
          'order-1' : !isCurrentUserMsg,
          'invisible' : isMinuteNotChangeForSameUser
        })}>
          <Image
            fill
            src={isCurrentUserMsg ? (sessionImg as string) : partnerChatData.image || ""}
            alt={`${partnerChatData.name} profile picture`}
            referrerPolicy="no-referrer"
            className="rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
