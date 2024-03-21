import ChatListHeader from "./ChatListHeader";
import ContactsList from "./ContactsList";
import List from "./List";
import SearchBar from "./SearchBar";
import { useEffect, useState } from "react";

const ChatList = ({
  token,
  router,
  currentUser,
  allUsers,
  contactsPage,
  setContactsPage,
  setCurrentChatUser,
  userContacts,
  setUserContacts,
  setOnlineUsers,
  filteredContacts,
  setFilteredContacts,
  contactSearch,
  setContactSearch,
}) => {
  const [pageType, setPageType] = useState("default");

  useEffect(() => {
    if (contactsPage) {
      setPageType("all-contacts");
    } else {
      setPageType("default");
    }
  }, [contactsPage]);

  return (
    <div className="bg-panel-header-background flex flex-col border-r border-l border-[#38444d] w-[40rem] md:w-[30rem] sm:max-w-[20rem] xs:!max-w-[17rem] h-screen sticky top-0">
      {pageType === "default" && (
        <>
          <ChatListHeader
            currentUser={currentUser}
            contactsPage={contactsPage}
            setContactsPage={setContactsPage}
            router={router}
          />
          <SearchBar
            contactSearch={contactSearch}
            userContacts={userContacts}
            setContactSearch={setContactSearch}
            setFilteredContacts={setFilteredContacts}
          />
          <List
            token={token}
            currentUser={currentUser}
            userContacts={userContacts}
            setUserContacts={setUserContacts}
            filteredContacts={filteredContacts}
            setOnlineUsers={setOnlineUsers}
            setCurrentChatUser={setCurrentChatUser}
          />
        </>
      )}
      {pageType === "all-contacts" && (
        <ContactsList
          currentUser={currentUser}
          contactsPage={contactsPage}
          setContactsPage={setContactsPage}
          setCurrentChatUser={setCurrentChatUser}
          allUsers={allUsers}
        />
      )}
    </div>
  );
};

export default ChatList;
