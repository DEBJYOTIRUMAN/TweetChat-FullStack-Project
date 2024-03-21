import { useContext } from "react";
import { TweetChatContext } from "../../../context/TweetChatContext";
import IncomingVideoCall from "../Common/IncomingVideoCall";
import IncomingVoiceCall from "../Common/IncomingVoiceCall";
import VideoCall from "../Call/VideoCall";
import VoiceCall from "../Call/VoiceCall";

const Layout = ({ children }) => {
  const {
    currentUser,
    socket,
    voiceCall,
    setVoiceCall,
    videoCall,
    setVideoCall,
    incomingVoiceCall,
    setIncomingVoiceCall,
    incomingVideoCall,
    setIncomingVideoCall,
  } = useContext(TweetChatContext);

  return (
    <>
      {incomingVideoCall && (
        <IncomingVideoCall
          socket={socket}
          incomingVideoCall={incomingVideoCall}
          setVoiceCall={setVoiceCall}
          setVideoCall={setVideoCall}
          setIncomingVoiceCall={setIncomingVoiceCall}
          setIncomingVideoCall={setIncomingVideoCall}
        />
      )}
      {incomingVoiceCall && (
        <IncomingVoiceCall
          socket={socket}
          incomingVoiceCall={incomingVoiceCall}
          setVoiceCall={setVoiceCall}
          setVideoCall={setVideoCall}
          setIncomingVoiceCall={setIncomingVoiceCall}
          setIncomingVideoCall={setIncomingVideoCall}
        />
      )}
      {videoCall && (
        <div className="h-screen w-screen max-h-full overflow-hidden">
          <VideoCall
            videoCall={videoCall}
            socket={socket}
            currentUser={currentUser}
            setVoiceCall={setVoiceCall}
            setVideoCall={setVideoCall}
            setIncomingVoiceCall={setIncomingVoiceCall}
            setIncomingVideoCall={setIncomingVideoCall}
          />
        </div>
      )}
      {voiceCall && (
        <div className="h-screen w-screen max-h-full overflow-hidden">
          <VoiceCall
            voiceCall={voiceCall}
            socket={socket}
            currentUser={currentUser}
            setVoiceCall={setVoiceCall}
            setVideoCall={setVideoCall}
            setIncomingVoiceCall={setIncomingVoiceCall}
            setIncomingVideoCall={setIncomingVideoCall}
          />
        </div>
      )}
      {children}
    </>
  );
};

export default Layout;
