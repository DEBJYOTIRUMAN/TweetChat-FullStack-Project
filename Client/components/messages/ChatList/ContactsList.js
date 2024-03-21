import { useEffect, useState } from "react";
import { BiArrowBack, BiSearchAlt2 } from "react-icons/bi";
import ChatListItem from "./ChatListItem";

const ContactsList = ({
  currentUser,
  contactsPage,
  setContactsPage,
  setCurrentChatUser,
  allUsers,
}) => {
  const [allContacts, setAllContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchContacts, setSearchContacts] = useState([]);

  useEffect(() => {
    if (searchTerm) {
      const filteredData = allContacts.filter((obj) =>
        obj.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchContacts(filteredData);
    } else {
      setSearchContacts(allContacts);
    }
  }, [searchTerm]);

  useEffect(() => {
    const contacts = [...currentUser.followers, ...currentUser.following];
    const filterUsers = allUsers.filter((user) => contacts.includes(user._id));
    setAllContacts(filterUsers);
    setSearchContacts(filterUsers);
  }, [currentUser, allUsers]);

  return (
    <div className="h-full flex flex-col">
      <div className="h-16 flex items-end px-3 py-5">
        <div className="flex items-center gap-12 text-white sm:gap-6">
          <BiArrowBack
            className="cursor-pointer text-xl"
            onClick={() => setContactsPage(!contactsPage)}
          />
          <span>New Chat</span>
        </div>
      </div>
      <div className="bg-conversation-panel-background h-full flex-auto overflow-auto custom-scrollbar">
        <div className="flex py-3 items-center gap-3 h-14">
          <div className="bg-panel-header-background flex items-center gap-5 px-3 py-1 rounded-lg flex-grow mx-4">
            <div>
              <BiSearchAlt2 className="text-panel-header-icon cursor-pointer text-lg" />
            </div>
            <div className="w-full">
              <input
                type="text"
                placeholder="Search Contacts"
                className="bg-transparent text-sm focus:outline-none text-white w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
        {searchContacts &&
          searchContacts.length > 0 &&
          searchContacts.map((contact) => {
            return (
              <ChatListItem
                key={contact.id}
                data={contact}
                setCurrentChatUser={setCurrentChatUser}
                contactsPage={contactsPage}
                setContactsPage={setContactsPage}
              />
            );
          })}
      </div>
    </div>
  );
};

export default ContactsList;
