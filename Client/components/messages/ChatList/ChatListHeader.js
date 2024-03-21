import Avatar from "../Common/Avatar";
import { BsFillChatLeftTextFill, BsThreeDotsVertical } from "react-icons/bs";

const ChatListHeader = ({
  currentUser,
  contactsPage,
  setContactsPage,
  router,
}) => {
  const handleAllContactsPage = () => {
    setContactsPage(!contactsPage);
  };

  return (
    <div className="h-16 px-4 py-3 flex justify-between items-center">
      <div
        className="cursor-pointer"
        onClick={() => router.push(`/profile/${currentUser.id}`)}
      >
        <Avatar type="sm" image={currentUser?.profileImage} />
      </div>
      <div className="flex gap-6">
        <BsFillChatLeftTextFill
          className="text-panel-header-icon cursor-pointer text-xl"
          title="New Chat"
          onClick={handleAllContactsPage}
        />

        <BsThreeDotsVertical
          className="text-panel-header-icon cursor-pointer text-xl"
          title="Menu"
        />
      </div>
    </div>
  );
};

export default ChatListHeader;
