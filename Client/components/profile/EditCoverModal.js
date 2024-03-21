import { useState } from "react";
import { GiEarthAmerica } from "react-icons/gi";
import axios from "axios";

const style = {
  wrapper: `h-[15rem] w-[25rem] text-white bg-[#15202b] rounded-3xl p-10 flex flex-col sm:w-[20rem]`,
  inputFieldsContainer: `flex-1 flex flex-col justify-center items-center`,
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

const EditCoverModal = ({
  token,
  setCurrentUser,
  currentAccount,
  setEditCoverModal,
  allUsers,
  setAllUsers,
}) => {
  const [coverImage, setCoverImage] = useState();
  const updateCoverImage = async () => {
    if(!coverImage) return;
    let formData = new FormData();
    formData.append("coverImage", coverImage);
    try {
      const userDoc = await axios.put(
        `http://localhost:5000/api/user/cover/${currentAccount}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token.access_token}`,
          },
        }
      );
      setCurrentUser(userDoc.data);
      setAllUsers(allUsers.map((user) => (user._id === currentAccount ? userDoc.data : user)));
      setEditCoverModal(false);
    } catch (error) {
      console.log(error);
      setEditCoverModal(false);
    }
  };

  return (
    <div className={style.wrapper}>
      <div className={style.inputFieldsContainer}>
        <div className={style.inputContainer}>
          <label
            htmlFor="image-upload"
            className={coverImage ? style.fileSelected : style.customInput}
          >
            <input
              type="file"
              id="image-upload"
              accept=".jpg, .jpeg, .png"
              className={style.fileInput}
              placeholder="Image URL"
              onChange={(e) => setCoverImage(e.target.files[0])}
            />
            Select File
          </label>
        </div>
      </div>
      <div className={style.lower}>
        <div className={style.visibility}>
          <GiEarthAmerica />
          <span className={style.visibilityText}>Everyone can see this</span>
        </div>
        <div
          className={coverImage ? style.uploadButton : style.inactiveUploadButton}
          onClick={() => updateCoverImage()}
        >
          Post
        </div>
      </div>
    </div>
  );
};

export default EditCoverModal;
