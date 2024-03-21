import Avatar from "../Common/Avatar";

const ChatListItem = ({
  data,
  setCurrentChatUser,
  contactsPage,
  setContactsPage,
}) => {
  const handleContactClick = () => {
    if (contactsPage) setContactsPage(!contactsPage);
    setCurrentChatUser(data);
  };
  return (
    <div
      className={`flex cursor-pointer items-center hover:bg-panel-header-background`}
      onClick={handleContactClick}
    >
      <div className="min-w-fit px-5 pt-3 pb-1">
        <Avatar type="lg" image={data?.profileImage} />
      </div>
      <div className="min-h-full flex flex-col justify-center mt-3 pr-2 w-full">
        <div className="flex justify-between">
          <div>
            <span className="text-white">{data?.name}</span>
          </div>
        </div>
        <div className="flex border-b border-conversation-border pb-2 pt-1 pr-2">
          <div className="flex justify-between w-full">
            <span className="text-secondary line-clamp-1 text-sm">Contact</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatListItem;
