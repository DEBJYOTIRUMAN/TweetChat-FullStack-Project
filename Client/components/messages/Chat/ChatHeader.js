import Avatar from "../Common/Avatar";
import { MdCall } from "react-icons/md";
import { IoVideocam } from "react-icons/io5";
import { BiSearchAlt2, BiArrowBack } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";

const ChatHeader = ({
  currentChatUser,
  onlineUsers,
  setCurrentChatUser,
  setVoiceCall,
  setVideoCall,
  messagesSearch,
  setMessagesSearch,
  router,
}) => {
  const handleVoiceCall = () => {
    setVoiceCall({
      ...currentChatUser,
      type: "out-going",
      callType: "voice",
      roomId: Date.now(),
    });
  };

  const handleVideoCall = () => {
    setVideoCall({
      ...currentChatUser,
      type: "out-going",
      callType: "video",
      roomId: Date.now(),
    });
  };

  return (
    <div className="h-16 px-4 py-3 flex justify-between items-center bg-panel-header-background z-10">
      <div className="flex items-center justify-center gap-4 sm:gap-2">
        <BiArrowBack
          className="cursor-pointer text-xl"
          onClick={() => setCurrentChatUser(undefined)}
        />
        <div
          onClick={() => router.push(`/profile/${currentChatUser.id}`)}
          className="cursor-pointer"
        >
          <Avatar type="sm-responsive" image={currentChatUser?.profileImage} />
        </div>
        <div
          className="flex flex-col cursor-pointer"
          onClick={() => router.push(`/profile/${currentChatUser.id}`)}
        >
          <span className="text-primary-strong sm:text-sm xs:hidden">{currentChatUser?.name}</span>
          <span className="text-primary-strong hidden xs:inline xs:text-sm">{currentChatUser?.name.split(" ")[0]}</span>
          <span className="text-secondary text-sm sm:text-xs">
            {onlineUsers.includes(currentChatUser.id) ? "online" : "offline"}
          </span>
        </div>
      </div>
      <div className="flex gap-6 sm:gap-4">
        <MdCall
          className="text-panel-header-icon cursor-pointer text-xl"
          onClick={handleVoiceCall}
        />
        <IoVideocam
          className="text-panel-header-icon cursor-pointer text-xl"
          onClick={handleVideoCall}
        />
        <BiSearchAlt2
          className="text-panel-header-icon cursor-pointer text-xl"
          onClick={() => setMessagesSearch(!messagesSearch)}
        />
        <BsThreeDotsVertical className="text-panel-header-icon cursor-pointer text-xl sm:hidden" />
      </div>
    </div>
  );
};

export default ChatHeader;
