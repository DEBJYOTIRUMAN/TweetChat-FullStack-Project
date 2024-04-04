import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MdOutlineCallEnd } from "react-icons/md";

const Container = ({
  data,
  socket,
  currentUser,
  setVoiceCall,
  setVideoCall,
  setIncomingVoiceCall,
  setIncomingVideoCall,
}) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [token, setToken] = useState(undefined);
  const [zgVar, setZgVar] = useState(undefined);
  const [localStream, setLocalStream] = useState(undefined);
  const [publishStream, setPublishStream] = useState(undefined);

  useEffect(() => {
    if (data.type === "out-going")
      socket.current.on("accept-call", () => setCallAccepted(true));
    else {
      setTimeout(() => {
        setCallAccepted(true);
      }, 1000);
    }
  }, [data]);

  useEffect(() => {
    const getCallToken = async () => {
      try {
        const {
          data: { token: returnedToken },
        } = await axios.get(
          `https://tweetchat-1y3f.onrender.com/api/generate-call-token/${currentUser.id}`
        );
        setToken(returnedToken);
      } catch (err) {
        console.log(err);
      }
    };
    getCallToken();
  }, [callAccepted]);

  useEffect(() => {
    const startCall = async () => {
      import("zego-express-engine-webrtc").then(
        async ({ ZegoExpressEngine }) => {
          const zg = new ZegoExpressEngine(
            parseInt(process.env.NEXT_PUBLIC_ZEGO_APP_ID),
            process.env.NEXT_PUBLIC_ZEGO_SERVER_ID
          );
          setZgVar(zg);

          zg.on(
            "roomStreamUpdate",
            async (roomID, updateType, streamList, extendedData) => {
              if (updateType === "ADD") {
                const rmVideo = document.getElementById("remote-video");
                const vd = document.createElement(
                  data.callType === "video" ? "video" : "audio"
                );
                vd.id = streamList[0].streamID;
                vd.autoplay = true;
                vd.playsInline = true;
                vd.muted = false;
                if (rmVideo) {
                  rmVideo.appendChild(vd);
                }
                zg.startPlayingStream(streamList[0].streamID, {
                  audio: true,
                  video: true,
                }).then((stream) => (vd.srcObject = stream));
              } else if (
                updateType === "DELETE" &&
                zg &&
                localStream &&
                streamList[0].streamID
              ) {
                zg.destroyStream(localStream);
                zg.stopPublishingStream(streamList[0].streamID);
                zg.logoutRoom(data.roomId.toString());
                setVoiceCall(undefined);
                setVideoCall(undefined);
                setIncomingVoiceCall(undefined);
                setIncomingVideoCall(undefined);
              }
            }
          );

          await zg.loginRoom(
            data.roomId.toString(),
            token,
            {
              userID: currentUser.id.toString(),
              userName: currentUser.name,
            },
            { userUpdate: true }
          );

          const localStream = await zg.createStream({
            camera: {
              audio: true,
              video: data.callType === "video" ? true : false,
            },
          });

          const localVideo = document.getElementById("local-video");
          const videoElement = document.createElement(
            data.callType === "video" ? "video" : "audio"
          );
          videoElement.id = "video-local-zego";
          videoElement.className = "h-28 w-32";
          videoElement.autoplay = true;
          videoElement.muted = false;
          videoElement.playsInline = true;
          localVideo.appendChild(videoElement);

          const td = document.getElementById("video-local-zego");
          td.srcObject = localStream;
          const streamID = "qweasdzxc" + Date.now();
          setPublishStream(streamID);
          setLocalStream(localStream);
          zg.startPublishingStream(streamID, localStream);
        }
      );
    };

    if (token) {
      startCall();
    }
  }, [token]);

  const endCall = () => {
    const id = data.id;
    if (zgVar && localStream && publishStream) {
      zgVar.destroyStream(localStream);
      zgVar.stopPublishingStream(publishStream);
      zgVar.logoutRoom(data.roomId.toString());
    }
    if (data.callType === "voice") {
      socket.current.emit("reject-voice-call", {
        from: id,
      });
    } else {
      socket.current.emit("reject-video-call", {
        from: id,
      });
    }
    setVoiceCall(undefined);
    setVideoCall(undefined);
    setIncomingVoiceCall(undefined);
    setIncomingVideoCall(undefined);
  };

  return (
    <div className="border-conversation-border border-1 w-full bg-conversation-panel-background flex flex-col h-screen overflow-hidden items-center justify-center text-white">
      <div className="flex flex-col gap-3 items-center">
        <span className="text-5xl sm:text-3xl">{data.name}</span>
        <span className="text-lg">
          {callAccepted && data.callType !== "video"
            ? "On going call"
            : "Calling"}
        </span>
      </div>
      {(!callAccepted || data.callType === "audio") && (
        <div className="relative w-[300px] h-[300px] my-10 overflow-hidden rounded-full sm:w-[250px] sm:h-[250px]">
          <Image
            src={data.profileImage}
            alt="avatar"
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="my-5 relative" id="remote-video">
        <div className="absolute bottom-0 right-0" id="local-video"></div>
      </div>
      <div className="h-16 w-16 bg-red-600 flex items-center justify-center rounded-full sm:h-12 sm:w-12">
        <MdOutlineCallEnd
          className="text-3xl cursor-pointer"
          onClick={endCall}
        />
      </div>
    </div>
  );
};

export default Container;
