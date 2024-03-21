import ChatListItem from "./ChatListItem";
import axios from "axios";
import { useEffect } from "react";

const List = ({
  token,
  currentUser,
  userContacts,
  setUserContacts,
  filteredContacts,
  setOnlineUsers,
  setCurrentChatUser,
  contactsPage,
  setContactsPage,
}) => {
  useEffect(() => {
    const getContacts = async () => {
      try {
        const {
          data: { users, onlineUsers },
        } = await axios.get(
          `https://tweetchat-1y3f.onrender.com/api/get-initial-contacts/${currentUser.id}`,
          {
            headers: {
              Authorization: `Bearer ${token.access_token}`,
            },
          }
        );
        setOnlineUsers(onlineUsers);
        setUserContacts(users);
      } catch (err) {
        console.log(err);
      }
    };
    if (currentUser?.id) getContacts();
  }, [currentUser]);

  return (
    <div className="bg-conversation-panel-background flex-auto overflow-auto max-h-full custom-scrollbar">
      {filteredContacts && filteredContacts.length > 0
        ? filteredContacts.map((contact) => (
            <ChatListItem
              key={contact.id}
              data={contact}
              setCurrentChatUser={setCurrentChatUser}
              contactsPage={contactsPage}
              setContactsPage={setContactsPage}
            />
          ))
        : userContacts.map((contact) => (
            <ChatListItem
              key={contact.id}
              data={contact}
              setCurrentChatUser={setCurrentChatUser}
              contactsPage={contactsPage}
              setContactsPage={setContactsPage}
            />
          ))}
    </div>
  );
};

export default List;
