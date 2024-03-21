import { useContext, useEffect } from "react";
import Sidebar from "../components/home/Sidebar";
import Widgets from "../components/home/Widgets";
import { TweetChatContext } from "../context/TweetChatContext";
import ChatList from "../components/messages/ChatList/ChatList";
import { useRouter } from "next/router";
import Chat from "../components/messages/Chat/Chat";
import SearchMessages from "../components/messages/Chat/SearchMessages";
import Layout from "../components/messages/Common/Layout";

const messages = () => {
  const {
    token,
    currentUser,
    setCurrentUser,
    currentAccount,
    posts,
    setPosts,
    allUsers,
    setAllUsers,
    news,
    contactsPage,
    setContactsPage,
    currentChatUser,
    setCurrentChatUser,
    messages,
    setMessages,
    socket,
    messagesSearch,
    setMessagesSearch,
    userContacts,
    setUserContacts,
    onlineUsers,
    setOnlineUsers,
    filteredContacts,
    setFilteredContacts,
    contactSearch,
    setContactSearch,
    voiceCall,
    setVoiceCall,
    videoCall,
    setVideoCall,
  } = useContext(TweetChatContext);
  const router = useRouter();
  const initialSelectedScreen = "Messages";

  useEffect(() => {
    setCurrentChatUser(undefined);
  }, []);

  return (
    <Layout>
      {!videoCall && !voiceCall && (
        <div className="flex justify-center min-h-screen min-w-screen select-none bg-[#15202b] text-white">
          <div className="max-w-[1400px] flex justify-between">
            <Sidebar
              initialSelectedIcon={initialSelectedScreen}
              currentAccount={currentAccount}
              currentUser={currentUser}
              posts={posts}
              setPosts={setPosts}
            />
            {!currentChatUser ? (
              <ChatList
                token={token}
                router={router}
                currentUser={currentUser}
                allUsers={allUsers}
                contactsPage={contactsPage}
                setContactsPage={setContactsPage}
                setCurrentChatUser={setCurrentChatUser}
                userContacts={userContacts}
                setUserContacts={setUserContacts}
                setOnlineUsers={setOnlineUsers}
                filteredContacts={filteredContacts}
                setFilteredContacts={setFilteredContacts}
                contactSearch={contactSearch}
                setContactSearch={setContactSearch}
              />
            ) : messagesSearch ? (
              <SearchMessages
                currentChatUser={currentChatUser}
                messages={messages}
                messagesSearch={messagesSearch}
                setMessagesSearch={setMessagesSearch}
              />
            ) : (
              <Chat
                token={token}
                messages={messages}
                setMessages={setMessages}
                currentChatUser={currentChatUser}
                currentUser={currentUser}
                onlineUsers={onlineUsers}
                setCurrentChatUser={setCurrentChatUser}
                setVoiceCall={setVoiceCall}
                setVideoCall={setVideoCall}
                messagesSearch={messagesSearch}
                setMessagesSearch={setMessagesSearch}
                socket={socket}
                router={router}
              />
            )}

            <Widgets
              currentUser={currentUser}
              currentAccount={currentAccount}
              allUsers={allUsers}
              setAllUsers={setAllUsers}
              setCurrentUser={setCurrentUser}
              news={news}
            />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default messages;
