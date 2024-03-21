import { calculateTime } from "../../../utils/CalculateTime";
import Image from "next/image";
import { useState } from "react";
import { imageModalStyles } from "../../../lib/constants";
import ShowImageModal from "../../home/ShowImageModal";
import Modal from "react-modal";
import { FiDownload } from "react-icons/fi";
import { downloadImage } from "../../../lib/download";

const ImageMessage = ({ message, currentChatUser }) => {
  const [showImage, setShowImage] = useState(false);
  return (
    <>
      <div
        className={`p-1 rounded-lg ${
          message.sender === currentChatUser.id
            ? "bg-panel-header-background"
            : "bg-outgoing-background"
        }`}
      >
        <div className="relative">
          <Image
            src={`https://tweetchat-1y3f.onrender.com/${message.message}`}
            className="rounded-lg sm:hidden"
            alt="asset"
            height={250}
            width={250}
            style={{objectFit:"cover"}}
            onClick={() => setShowImage(true)}
          />
          <Image
            src={`https://tweetchat-1y3f.onrender.com/${message.message}`}
            className="hidden sm:block rounded-lg"
            alt="asset"
            height={150}
            width={150}
            style={{objectFit:"cover"}}
            onClick={() => setShowImage(true)}
          />
          <div className="absolute bottom-1 right-1 flex items-end gap-1">
            <span className="text-bubble-meta text-[11px] pt-1 min-w-fit">
              {calculateTime(message.createdAt)}
            </span>
          </div>
          <div
            className="absolute top-1 right-1 flex items-end rounded-full p-1 text-xl bg-outgoing-background hover:bg-icon-blue"
            onClick={() =>
              message.message
                ? downloadImage(
                    message._id,
                    `https://tweetchat-1y3f.onrender.com/${message.message}`
                  )
                : null
            }
          >
            <FiDownload />
          </div>
        </div>
      </div>
      <Modal
        isOpen={showImage}
        onRequestClose={() => setShowImage(false)}
        style={imageModalStyles}
      >
        <ShowImageModal
          setShowImage={setShowImage}
          image={`https://tweetchat-1y3f.onrender.com/${message.message}`}
        />
      </Modal>
    </>
  );
};

export default ImageMessage;
