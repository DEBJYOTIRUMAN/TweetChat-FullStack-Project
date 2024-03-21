import { AiOutlineClose } from "react-icons/ai";

const ShowImageModal = ({ setShowImage, image }) => {
  return (
    <div className="w-full h-full text-white bg-[#15202b] rounded-3xl flex flex-col">
      <div className="flex items-center justify-end border-b border-gray-700 p-2">
        <div
          className="w-9 h-9 flex items-center justify-center xl:px-0 bg-slate-800 rounded-md"
          onClick={() => setShowImage(false)}
        >
          <AiOutlineClose size={24} />
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <img src={image} alt="Image Not Found!" className="w-full max-h-[80vh] object-contain" />
        </div>
    </div>
  );
};

export default ShowImageModal;
