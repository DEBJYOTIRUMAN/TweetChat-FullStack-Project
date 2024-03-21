import Image from "next/image";

const IncomingVoiceCall = ({
  socket,
  incomingVoiceCall,
  setVoiceCall,
  setVideoCall,
  setIncomingVoiceCall,
  setIncomingVideoCall,
}) => {
  const acceptCall = () => {
    setVoiceCall({ ...incomingVoiceCall, type: "in-coming" });
    socket.current.emit("accept-incoming-call", { id: incomingVoiceCall.id });
    setIncomingVoiceCall(undefined);
  };

  const rejectCall = () => {
    socket.current.emit("reject-voice-call", { from: incomingVoiceCall.id });
    setVoiceCall(undefined);
    setVideoCall(undefined);
    setIncomingVoiceCall(undefined);
    setIncomingVideoCall(undefined);
  };

  return (
    <div className="h-24 w-80 fixed bottom-8 mb-0 right-6 z-50 rounded-sm flex gap-5 items-center justify-start p-4 bg-conversation-panel-background text-white drop-shadow-2xl border-icon-blue border-2 py-14 xs:w-72">
      <div className="relative w-[70px] h-[70px] rounded-full overflow-hidden">
        <Image
          src={incomingVoiceCall.profileImage}
          alt="avatar"
          fill
          style={{objectFit:"cover"}}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div>
        <div>{incomingVoiceCall.name}</div>
        <div className="text-xs">Incoming Voice Call</div>
        <div className="flex gap-2 mt-2">
          <button
            className="bg-red-500 p-1 px-3 text-sm rounded-full"
            onClick={rejectCall}
          >
            Reject
          </button>
          <button
            className="bg-green-500 p-1 px-3 text-sm rounded-full"
            onClick={acceptCall}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncomingVoiceCall;
