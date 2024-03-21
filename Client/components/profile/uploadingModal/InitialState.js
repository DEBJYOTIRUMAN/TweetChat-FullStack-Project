import { GiEarthAmerica } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";

const style = {
  wrapper: `h-[20rem] w-[35rem] text-white bg-[#15202b] rounded-3xl px-10 py-5 flex flex-col sm:w-[20rem]`,
  inputFieldsContainer: `flex-1`,
  inputContainer: `mb-4`,
  fileInput: `hidden`,
  input: `bg-transparent outline-none text-xl w-full`,
  customInput: `bg-white text-black px-3 py-1 rounded-full hover:bg-[#8899a6] cursor-pointer`,
  fileSelected: `bg-[#2b6127] text-white px-3 py-1 rounded-full hover:bg-[#8899a6] cursor-pointer`,
  lower: `flex justify-between items-center`,
  visibility: `flex items-center text-[#1d9bf0] text-sm font-bold sm:text-xs`,
  visibilityText: `ml-2`,
  uploadButton: `bg-white text-black px-3 py-1 rounded-full hover:bg-[#8899a6] cursor-pointer`,
  inactiveUploadButton: `text-black px-3 py-1 rounded-full bg-[#8899a6]`,
};

const InitialState = ({
  profileImage,
  setProfileImage,
  name,
  setName,
  upload,
  setUploadModalVisible,
}) => {
  return (
    <div className={style.wrapper}>
      <div className="flex items-center">
        <div
          className="w-9 h-9 flex items-center justify-center mb-5"
          onClick={() => setUploadModalVisible(false)}
        >
          <AiOutlineClose size={22} />
        </div>
      </div>
      <div className={style.inputFieldsContainer}>
        <div className={style.inputContainer}>
          <label
            htmlFor="image-upload"
            className={profileImage ? style.fileSelected : style.customInput}
          >
            <input
              type="file"
              id="image-upload"
              accept=".jpg, .jpeg, .png"
              className={style.fileInput}
              placeholder="Image URL"
              onChange={(e) => setProfileImage(e.target.files[0])}
            />
            Select File
          </label>
        </div>
        <div className={style.inputContainer}>
          <input
            type="text"
            className={style.input}
            placeholder="Write about something"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>
      <div className={style.lower}>
        <div className={style.visibility}>
          <GiEarthAmerica />
          <span className={style.visibilityText}>Everyone can see this</span>
        </div>
        <div
          className={
            profileImage ? style.uploadButton : style.inactiveUploadButton
          }
          onClick={() => {
            if (profileImage) {
              upload();
            }
          }}
        >
          Upload
        </div>
      </div>
    </div>
  );
};

export default InitialState;
