import { BsArrowLeftShort } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { useRouter } from "next/router";
import Modal from "react-modal";
import ProfileImageUploader from "./uploadingModal/ProfileImageUploader";
import { customStyles, imageModalStyles } from "../../lib/constants";
import { useState } from "react";
import EditUserNameModal from "./EditUserNameModal";
import EditCoverModal from "./EditCoverModal";
import ShowImageModal from "../home/ShowImageModal";
import { storeToken } from "../../lib/storage";

const style = {
  wrapper: `border-[#38444d] border-b`,
  header: `py-1 px-3 mt-2 flex items-center`,
  primary: `bg-transparent outline-none font-bold`,
  secondary: `text-[#8899a6] text-xs`,
  others: `text-[#8899a6] text-sm`,
  backButton: `text-3xl cursor-pointer mr-2 rounded-full hover:bg-[#313b44] p-1`,
  coverPhotoContainer: `flex items-center justify-center h-[30vh] overflow-hidden`,
  coverPhoto: `object-cover h-full w-full`,
  profileImageWrapper: `px-3`,
  profileImageContainer: `relative h-[6rem] w-[6rem] rounded-full mt-[-3rem] mb-2 flex justify-start items-center flex justify-between`,
  profileImage: `object-cover rounded-full h-full w-full z-1`,
  details: `px-3`,
  othersDetails: `px-3 mt-1`,
  detailsContainer: `px-3 flex justify-between`,
  nav: `flex justify-around mt-4 mb-2 text-sm font-semibold text-[#8899a6]`,
  activeNav: `text-white font-bold bg-[#1d9bf0]`,
  editButton: `text-xl cursor-pointer rounded-full hover:bg-[#313b44] p-1`,
  profileEditButton: `absolute text-xl cursor-pointer rounded-full hover:bg-[#313b44] p-1 bg-slate-800 top-1 right-5 z-2`,
  coverEditButton: `absolute text-xl cursor-pointer rounded-full hover:bg-[#313b44] p-1 bg-slate-800 top-1 right-1`,
  btnStyle: `h-8 px-4 m-2 text-sm bg-[#1d9bf0] text-white rounded-lg focus:shadow-outline hover:bg-blue-600`,
  tabButton: `flex-1 text-center p-2 cursor-pointer rounded-3xl hover:bg-[#313b44]`,
};

const ProfileHeader = ({
  token,
  setToken,
  currentUser,
  setCurrentUser,
  currentAccount,
  activeTab,
  setActiveTab,
  renderPosts,
  allUsers,
  setAllUsers,
  id,
  user,
  handleFollow,
  socket,
}) => {
  const router = useRouter();
  const [uploadModalVisible, setUploadModalVisible] = useState(false);
  const [editUserNameModal, setEditUserNameModal] = useState(false);
  const [editCoverModal, setEditCoverModal] = useState(false);
  const [showProfileImage, setShowProfileImage] = useState(false);
  const [showCoverImage, setShowCoverImage] = useState(false);

  return user && Object.keys(user).length !== 0 ? (
    <div className={style.wrapper}>
      <div className={style.header}>
        <div onClick={() => router.back()} className={style.backButton}>
          <BsArrowLeftShort />
        </div>
        <div className={style.details}>
          <div className={style.primary}>{user.name}</div>
          <div
            className={style.secondary}
          >{`${renderPosts.length} ${activeTab}`}</div>
        </div>
      </div>
      <div className={style.coverPhotoContainer}>
        <div className="w-full h-full relative">
          <img
            src={user.coverImage}
            alt="Cover Photo"
            className={style.coverPhoto}
            onClick={() => setShowCoverImage(true)}
          />
          {currentAccount === id && (
            <div
              onClick={() => setEditCoverModal(true)}
              className={style.coverEditButton}
            >
              <BiEdit size={18} />
            </div>
          )}
        </div>
      </div>
      <div className={style.profileImageWrapper}>
        <div className={style.profileImageContainer}>
          <img
            src={user.profileImage}
            alt="Image Not Found"
            className={style.profileImage}
            onClick={() => setShowProfileImage(true)}
          />
          {currentAccount === id && (
            <div
              onClick={() => setUploadModalVisible(true)}
              className={style.profileEditButton}
            >
              <BiEdit size={16} />
            </div>
          )}
        </div>
      </div>
      <div className={style.detailsContainer}>
        <div>
          <div className="flex items-center">
            <div className={style.primary}>{user.name}</div>
            {currentAccount === id && (
              <div
                onClick={() => setEditUserNameModal(true)}
                className={style.editButton}
              >
                <BiEdit />
              </div>
            )}
          </div>
          <div className={style.secondary}>{user.email}</div>
        </div>
        {currentAccount !== id ? (
          <button
            type="submit"
            onClick={() =>
              handleFollow(
                user,
                currentUser,
                currentAccount,
                allUsers,
                setAllUsers,
                setCurrentUser
              )
            }
            className={style.btnStyle}
          >
            {user.followers.includes(currentAccount) ? "Following" : "Follow"}
          </button>
        ) : (
          <button
            type="submit"
            onClick={() => {
              setToken({});
              storeToken({});
              socket.current.emit("signout", currentAccount);
              setCurrentUser({});
              router.push("/");
            }}
            className={style.btnStyle}
          >
            Logout
          </button>
        )}
      </div>
      <div className={style.othersDetails}>
        <div
          className="inline-block hover:underline"
          onClick={() => router.push(`/follow/${id}`)}
        >
          <span className="font-bold text-sm">{user.followers.length} </span>
          <span className={style.others}>Followers</span>
        </div>
        <div
          className="inline-block ml-4 hover:underline"
          onClick={() => router.push(`/follow/${id}`)}
        >
          <span className="font-bold text-sm">{user.following.length} </span>
          <span className={style.others}>Following</span>
        </div>
      </div>
      <div className={style.nav}>
        <div
          className={`${style.tabButton} ${
            activeTab === "Posts" && style.activeNav
          }`}
          onClick={() => setActiveTab("Posts")}
        >
          Posts
        </div>
        <div
          className={`${style.tabButton} ${
            activeTab === "Reposts" && style.activeNav
          }`}
          onClick={() => setActiveTab("Reposts")}
        >
          Reposts
        </div>
        <div
          className={`${style.tabButton} ${
            activeTab === "Media" && style.activeNav
          }`}
          onClick={() => setActiveTab("Media")}
        >
          Media
        </div>
        <div
          className={`${style.tabButton} ${
            activeTab === "Likes" && style.activeNav
          }`}
          onClick={() => setActiveTab("Likes")}
        >
          Likes
        </div>
      </div>
      {/* Edit User Name Modal */}
      <Modal
        isOpen={editUserNameModal}
        onRequestClose={() => setEditUserNameModal(false)}
        style={customStyles}
      >
        <EditUserNameModal
          token={token}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          currentAccount={currentAccount}
          setEditUserNameModal={setEditUserNameModal}
          allUsers={allUsers}
          setAllUsers={setAllUsers}
        />
      </Modal>
      {/* Profile Image Uploading Modal */}
      <Modal
        isOpen={uploadModalVisible}
        onRequestClose={() => setUploadModalVisible(false)}
        style={customStyles}
      >
        <ProfileImageUploader
          token={token}
          currentAccount={currentAccount}
          setCurrentUser={setCurrentUser}
          setUploadModalVisible={setUploadModalVisible}
          allUsers={allUsers}
          setAllUsers={setAllUsers}
        />
      </Modal>
      {/* Edit Cover Modal */}
      <Modal
        isOpen={editCoverModal}
        onRequestClose={() => setEditCoverModal(false)}
        style={customStyles}
      >
        <EditCoverModal
          token={token}
          setCurrentUser={setCurrentUser}
          currentAccount={currentAccount}
          setEditCoverModal={setEditCoverModal}
          allUsers={allUsers}
          setAllUsers={setAllUsers}
        />
      </Modal>
      {/* Show Profile Image Modal */}
      <Modal
        isOpen={showProfileImage}
        onRequestClose={() => setShowProfileImage(false)}
        style={imageModalStyles}
      >
        <ShowImageModal
          setShowImage={setShowProfileImage}
          image={user.profileImage}
        />
      </Modal>
      {/* Show Cover Image Modal */}
      <Modal
        isOpen={showCoverImage}
        onRequestClose={() => setShowCoverImage(false)}
        style={imageModalStyles}
      >
        <ShowImageModal
          setShowImage={setShowCoverImage}
          image={user.coverImage}
        />
      </Modal>
    </div>
  ) : (
    <></>
  );
};

export default ProfileHeader;
