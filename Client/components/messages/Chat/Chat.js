import ChatHeader from "./ChatHeader";
import ChatContainer from "./ChatContainer";
import MessageBar from "./MessageBar";

const Chat = ({
  token,
  messages,
  setMessages,
  currentChatUser,
  currentUser,
  onlineUsers,
  setCurrentChatUser,
  setVoiceCall,
  setVideoCall,
  messagesSearch,
  setMessagesSearch,
  socket,
  router,
}) => {
  return (
    <div className="bg-conversation-panel-background flex flex-col border-r border-l border-[#38444d] w-[40rem] md:w-[30rem] sm:max-w-[20rem] xs:!max-w-[17rem] h-screen sticky top-0">
      <ChatHeader
        currentChatUser={currentChatUser}
        onlineUsers={onlineUsers}
        setCurrentChatUser={setCurrentChatUser}
        setVoiceCall={setVoiceCall}
        setVideoCall={setVideoCall}
        messagesSearch={messagesSearch}
        setMessagesSearch={setMessagesSearch}
        router={router}
      />
      <ChatContainer
        messages={messages}
        currentChatUser={currentChatUser}
        currentUser={currentUser}
      />
      <MessageBar
        token={token}
        currentUser={currentUser}
        currentChatUser={currentChatUser}
        socket={socket}
        messages={messages}
        setMessages={setMessages}
      />
    </div>
  );
};

export default Chat;
