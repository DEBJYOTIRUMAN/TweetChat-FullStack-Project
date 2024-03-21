import { useState } from "react";
import { BsCardImage, BsEmojiSmile } from "react-icons/bs";
import { RiFileGifLine, RiBarChartHorizontalFill } from "react-icons/ri";
import { IoMdCalendar } from "react-icons/io";
import { MdOutlineLocationOn } from "react-icons/md";
import axios from "axios";
import Modal from "react-modal";
import PostImageUploader from "./postUploadingModal/PostImageUploader";
import { customStyles } from "../../lib/constants";
import { useRouter } from "next/router";
import ComingSoonModal from "./ComingSoonModal";

const style = {
  wrapper: `px-4 flex flex-row border-b border-[#38444d] pb-4`,
  postBoxLeft: `mr-4 xs:hidden`,
  postBoxRight: `flex-1`,
  profileImage: `h-12 w-12 rounded-full object-cover`,
  inputField: `w-full h-full outline-none bg-transparent text-lg`,
  formLowerContainer: `flex`,
  iconsContainer: `text-[#1d9bf0] flex flex-1 items-center`,
  icon: `mr-2 hover:bg-[#1e364a] hover:rounded-full hover:text-[#fff]`,
  submitGeneral: `px-6 py-2 rounded-3xl font-bold`,
  inactiveSubmit: `bg-[#196195] text-[#95999e]`,
  activeSubmit: `bg-[#1d9bf0] text-white`,
};

const PostBox = ({ token, currentAccount, currentUser, posts, setPosts }) => {
  const router = useRouter();
  const [postMessage, setPostMessage] = useState("");
  const [uploadModalVisible, setUploadModalVisible] = useState(false);
  const [comingSoon, setComingSoon] = useState(false);
  const submitPost = async (event) => {
    event.preventDefault();
    if (postMessage.length < 1) return;
    let formData = new FormData();
    formData.append("caption", postMessage);
    try {
      const newPost = await axios.post(
        `https://tweetchat-1y3f.onrender.com/api/post/${currentAccount}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token.access_token}`,
          },
        }
      );
      setPosts([newPost.data, ...posts]);
      setPostMessage("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className={style.wrapper}>
        <div className={style.postBoxLeft}>
          <img
            src={currentUser.profileImage}
            className={style.profileImage}
            alt="Profile Image"
            onClick={() => router.push(`/profile/${currentAccount}`)}
          />
        </div>
        <div className={style.postBoxRight}>
          <form>
            <textarea
              onChange={(e) => setPostMessage(e.target.value)}
              value={postMessage}
              placeholder="What's happening?"
              className={style.inputField}
            />
            <div className={style.formLowerContainer}>
              <div className={style.iconsContainer}>
                <BsCardImage
                  className={style.icon}
                  onClick={() => {
                    setPostMessage(""), setUploadModalVisible(true);
                  }}
                />
                <RiFileGifLine
                  className={style.icon}
                  onClick={() => setComingSoon(true)}
                />
                <RiBarChartHorizontalFill
                  className={style.icon}
                  onClick={() => setComingSoon(true)}
                />
                <BsEmojiSmile
                  className={style.icon}
                  onClick={() => setComingSoon(true)}
                />
                <IoMdCalendar
                  className={style.icon}
                  onClick={() => setComingSoon(true)}
                />
                <MdOutlineLocationOn
                  className={style.icon}
                  onClick={() => setComingSoon(true)}
                />
              </div>
              <button
                type="submit"
                onClick={(event) => submitPost(event)}
                disabled={!postMessage}
                className={`${style.submitGeneral} ${
                  postMessage ? style.activeSubmit : style.inactiveSubmit
                }`}
              >
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* Post Image Uploader */}
      <Modal
        isOpen={uploadModalVisible}
        onRequestClose={() => setUploadModalVisible(false)}
        style={customStyles}
      >
        <PostImageUploader
          posts={posts}
          setPosts={setPosts}
          setUploadModalVisible={setUploadModalVisible}
        />
      </Modal>
      {/* Coming Soon Modal */}
      <Modal
        isOpen={comingSoon}
        onRequestClose={() => setComingSoon(false)}
        style={customStyles}
      >
        <ComingSoonModal setComingSoon={setComingSoon} />
      </Modal>
    </>
  );
};

export default PostBox;
