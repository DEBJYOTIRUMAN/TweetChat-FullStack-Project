import Avatar from "../Common/Avatar";
import { calculateTime } from "../../../utils/CalculateTime";
import { useEffect, useRef, useState } from "react";
import { FaPlay, FaStop } from "react-icons/fa";
import WaveSurfer from "wavesurfer.js";

const VoiceMessage = ({ message, currentChatUser, currentUser }) => {
  const [audioMessage, setAudioMessage] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPlaybackTime, setCurrentPlaybackTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);

  const waveFormRef = useRef(null);
  const waveform = useRef(null);

  useEffect(() => {
    if (waveform.current === null) {
      waveform.current = WaveSurfer.create({
        container: waveFormRef.current,
        waveColor: "#ccc",
        progressColor: "#005a99",
        cursorColor: "#9bc8ff",
        barWidth: 2,
        height: 30,
        responsive: true,
      });

      waveform.current.on("finish", () => {
        setIsPlaying(false);
      });
    }

    return () => {
      waveform.current.destroy();
    };
  }, []);

  useEffect(() => {
    const audioURL = `http://localhost:5000/${message.message}`;
    const audio = new Audio(audioURL);
    setAudioMessage(audio);
    waveform.current.load(audioURL);
    waveform.current.on("ready", () => {
      setTotalDuration(waveform.current.getDuration());
    });
  }, [message.message]);

  useEffect(() => {
    if (audioMessage) {
      const updatePlaybackTime = () => {
        setCurrentPlaybackTime(audioMessage.currentTime);
      };
      audioMessage.addEventListener("timeupdate", updatePlaybackTime);
      return () => {
        audioMessage.removeEventListener("timeupdate", updatePlaybackTime);
      };
    }
  }, [audioMessage]);

  const formatTime = (time) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}: ${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handlePlayAudio = () => {
    if (audioMessage) {
      waveform.current.stop();
      waveform.current.play();
      audioMessage.play();
      setIsPlaying(true);
    }
  };

  const handlePauseAudio = () => {
    waveform.current.stop();
    audioMessage.pause();
    setIsPlaying(false);
  };

  return (
    <div
      className={`flex items-center gap-5 sm:gap-2 text-white px-4 py-4 text-sm rounded-md ${
        message.sender === currentChatUser.id
          ? "bg-panel-header-background"
          : "bg-outgoing-background"
      }`}
    >
      <div>
        {message.sender === currentChatUser.id ? (
          <Avatar type="lg-responsive" image={currentChatUser?.profileImage} />
        ) : (
          <Avatar type="lg-responsive" image={currentUser?.profileImage} />
        )}
      </div>
      <div className="cursor-pointer text-xl sm:text-sm">
        {!isPlaying ? (
          <FaPlay onClick={handlePlayAudio} />
        ) : (
          <FaStop onClick={handlePauseAudio} />
        )}
      </div>
      <div className="relative">
        <div className="w-60 sm:w-24" ref={waveFormRef} />
        <div className="text-bubble-meta text-[11px] sm:text-[8px] pt-1 flex justify-between absolute bottom-[-22px] w-full">
          <span>
            {formatTime(isPlaying ? currentPlaybackTime : totalDuration)}
          </span>
          <div className="flex gap-1">
            <span>{calculateTime(message.createdAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceMessage;
