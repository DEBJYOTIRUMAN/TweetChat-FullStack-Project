import dynamic from "next/dynamic";
import { useEffect } from "react";
const Container = dynamic(() => import("./Container"), { ssr: false });

const VoiceCall = ({
  voiceCall,
  socket,
  currentUser,
  setVoiceCall,
  setVideoCall,
  setIncomingVoiceCall,
  setIncomingVideoCall,
}) => {
  useEffect(() => {
    if (voiceCall.type === "out-going") {
      socket.current.emit("outgoing-voice-call", {
        to: voiceCall.id,
        from: {
          id: currentUser.id,
          profileImage: currentUser.profileImage,
          name: currentUser.name,
        },
        callType: voiceCall.callType,
        roomId: voiceCall.roomId,
      });
    }
  }, [voiceCall]);

  return (
    <Container
      data={voiceCall}
      socket={socket}
      currentUser={currentUser}
      setVoiceCall={setVoiceCall}
      setVideoCall={setVideoCall}
      setIncomingVoiceCall={setIncomingVoiceCall}
      setIncomingVideoCall={setIncomingVideoCall}
    />
  );
};

export default VoiceCall;
