import dynamic from "next/dynamic";
import { useEffect } from "react";
const Container = dynamic(() => import("./Container"), { ssr: false });

const VideoCall = ({
  videoCall,
  socket,
  currentUser,
  setVoiceCall,
  setVideoCall,
  setIncomingVoiceCall,
  setIncomingVideoCall,
}) => {
  useEffect(() => {
    if (videoCall.type === "out-going") {
      socket.current.emit("outgoing-video-call", {
        to: videoCall.id,
        from: {
          id: currentUser.id,
          profileImage: currentUser.profileImage,
          name: currentUser.name,
        },
        callType: videoCall.callType,
        roomId: videoCall.roomId,
      });
    }
  }, [videoCall]);

  return (
    <Container
      data={videoCall}
      socket={socket}
      currentUser={currentUser}
      setVoiceCall={setVoiceCall}
      setVideoCall={setVideoCall}
      setIncomingVoiceCall={setIncomingVoiceCall}
      setIncomingVideoCall={setIncomingVideoCall}
    />
  );
};

export default VideoCall;
