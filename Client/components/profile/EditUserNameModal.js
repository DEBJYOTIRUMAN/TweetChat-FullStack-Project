import { useState } from "react";
import { GiEarthAmerica } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";

const style = {
  wrapper: `h-[15rem] w-[25rem] text-white bg-[#15202b] rounded-3xl px-10 py-5 flex flex-col sm:w-[20rem]`,
  inputFieldsContainer: `flex-1`,
  inputContainer: `my-2`,
  input: `bg-transparent outline-none text-xl w-full`,
  lower: `flex justify-between items-center`,
  visibility: `flex items-center text-[#1d9bf0] text-sm font-bold sm:text-xs`,
  visibilityText: `ml-2`,
  uploadButton: `bg-white text-black px-3 py-1 rounded-full hover:bg-[#8899a6] cursor-pointer`,
  inactiveUploadButton: `text-black px-3 py-1 rounded-full bg-[#8899a6]`,
};

const EditUserNameModal = ({
  token,
  currentUser,
  setCurrentUser,
  currentAccount,
  setEditUserNameModal,
  allUsers,
  setAllUsers,
}) => {
  const [name, setName] = useState(currentUser.name);
  const updateUserName = () => {
    if (!name) return;
    fetch(`http://localhost:5000/api/user/${currentAccount}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.access_token}`,
      },
      body: JSON.stringify({
        name: name,
      }),
    })
      .then((res) => res.json())
      .then((userDoc) => {
        setCurrentUser(userDoc);
        setAllUsers(
          allUsers.map((user) =>
            user._id === currentAccount ? userDoc : user
          )
        );
        setEditUserNameModal(false);
      });
  };
  return (
    <div className={style.wrapper}>
      <div className="flex items-center justify-end">
        <div
          className="w-9 h-9 flex items-center justify-center"
          onClick={() => setEditUserNameModal(false)}
        >
          <AiOutlineClose size={22} />
        </div>
      </div>
      <div className={style.inputFieldsContainer}>
        <div className={style.inputContainer}>
          <input
            type="text"
            className={style.input}
            placeholder="Edit Name"
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
          className={name ? style.uploadButton : style.inactiveUploadButton}
          onClick={() => updateUserName()}
        >
          Done
        </div>
      </div>
    </div>
  );
};

export default EditUserNameModal;
