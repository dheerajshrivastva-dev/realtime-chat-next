import Button from "@/app/components/ui/Button";
import { cn } from "@/app/lib/utils";
import { SendHorizonal } from "lucide-react";
import { FC } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface loadingProps {}

const Loading: FC<loadingProps> = ({}) => {
  return (
    <SkeletonTheme baseColor="rgb(17 24 39)" highlightColor="rgb(31 41 55)">
      <main className="flex-1 flex flex-col justify-between h-full max-h-[calc(100vh-6rem)]">
        <div className="flex sm:items-center justify-between py-3 border-b border-gray-800">
          <div className="relative flex item-center space-x-4">
            <div className="relative">
              <div className="relative w-9 sm:w-12 h-9 sm:h-12">
                <Skeleton className="mb-4" circle height={50} width={50}/>
              </div>
            </div>
            <div className="flex flex-col leading-tight">
              <div className="text-sm sm:text-xl flex items-center">
                <span className="text-gray-300 mr-3 font-semibold">
                  <Skeleton className="mb-4" height={20} width={170} />
                </span>
              </div>
              <span className="text-xs sm:text-sm text-gray-400">
                <Skeleton className="mb-4" height={10} width={150} />
              </span>
            </div>
          </div>
        </div>
        <div
          id="messages"
          className="flex h-full flex-1 flex-col-reverse gap-4 p-3 overflow-y-auto scrollbar-thumb-pink scrollbar-thumb-rounded scrollbar-track-pink-lighter scrollbar-w-2 scrolling-touch relative"
        >
          <div />
          {new Array(6).fill({id: Math.random()}).map((message, index) => {
            const isCurrentUserMsg = index % 2 === 0;
            return (
              <div key={`${index}`} className="mt-2" data-q={index}>
                <div className="chat-message">
                  <div
                    className={cn("flex items-end", {
                      "justify-end": isCurrentUserMsg,
                    })}
                  >
                    <div
                      className={cn(
                        "flex flex-col space-y-2 text-base max-w-xs mx-2",
                        {
                          "order-1 items-end": isCurrentUserMsg,
                          "order-2 items-start": !isCurrentUserMsg,
                        }
                      )}
                    >
                      <span
                        className={cn("px-4 py-2 rounded-lg inline-block", {
                          "bg-pink-600 text-white": isCurrentUserMsg,
                          "bg-gray-800 text-gray-200": !isCurrentUserMsg,
                        })}
                      >
                        {<Skeleton height={15} width={150} />}{" "}
                        <span className="ml-2 text-xs text-gray-300">
                          <Skeleton height={10} width={30} />
                        </span>
                      </span>
                    </div>
                    <div
                      className={cn("shrink-0", {
                        "order-2": isCurrentUserMsg,
                        "order-1": !isCurrentUserMsg,
                      })}
                    >
                      <Skeleton
                        circle
                        height={30}
                        width={30}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="border-t border-gray-800 px-4 pt-4 mb-2 sm:mb-0">
          <div className="p-2 relative flex-1 overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-700 focus-within:ring-2 focus-within::ring-pink-600">
            <Skeleton height={70} />
            <div
              className="py-2"
              aria-hidden="true"
            >
              <div className="py-px">
                <div className="h-9" />
              </div>
            </div>
            <div className="absolute right-0 bottom-0 flex justify-between py-2 pl-2 pr-2">
              <div className="flex shrink-0">
                <Button
                  type="submit"
                >
                  <SendHorizonal />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </SkeletonTheme>
  );
};

export default Loading;
