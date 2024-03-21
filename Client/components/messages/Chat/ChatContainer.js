import ImageMessage from "./ImageMessage";
import { calculateTime } from "../../../utils/CalculateTime";
import dynamic from "next/dynamic";

const VoiceMessage = dynamic(() => import("./VoiceMessage"), {
  ssr: false,
});

const ChatContainer = ({ messages, currentChatUser, currentUser }) => {
  return (
    <div className="h-[80vh] w-full relative flex-grow overflow-auto custom-scrollbar">
      <div className="mx-10 my-6 relative bottom-0 z-5 left-0 sm:mx-4">
        <div className="flex w-full">
          <div className="flex flex-col justify-end w-full gap-1 overflow-hidden">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === currentChatUser.id
                    ? "justify-start"
                    : "justify-end"
                }`}
              >
                {message.type === "text" && (
                  <div
                    className={`text-white px-2 sm:px-1 py-[5px] text-sm sm:text-[10px] sm:leading-normal rounded-md flex gap-2 sm:gap-1 items-end max-w-[45%] xs:max-w-[50%] ${
                      message.sender === currentChatUser.id
                        ? "bg-panel-header-background"
                        : "bg-outgoing-background"
                    }`}
                  >
                    <span>{message.message}</span>
                    <div className="flex items-end gap-1 whitespace-nowrap">
                      <span className="text-bubble-meta text-[11px] pt-1 sm:text-[7px]">
                        {calculateTime(message.createdAt)}
                      </span>
                    </div>
                  </div>
                )}
                {message.type === "image" && (
                  <ImageMessage
                    message={message}
                    currentChatUser={currentChatUser}
                  />
                )}
                {message.type === "audio" && <VoiceMessage message={message} currentChatUser={currentChatUser} currentUser={currentUser} />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
