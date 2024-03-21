import { useState } from "react";
import SidebarOption from "./SidebarOption";
import { RiHome7Line, RiHome7Fill } from "react-icons/ri";
import { BiHash } from "react-icons/bi";
import { FiBell, FiMoreHorizontal, FiUpload } from "react-icons/fi";
import { HiOutlineMail, HiMail } from "react-icons/hi";
import { FaHashtag, FaBell } from "react-icons/fa";
import { CgMoreO, CgDetailsMore } from "react-icons/cg";
import Modal from "react-modal";
import PostImageUploader from "./postUploadingModal/PostImageUploader";
import { customStyles } from "../../lib/constants";
import { useRouter } from "next/router";
import { RiEarthFill, RiEarthLine } from "react-icons/ri";
import {
  BsBookmark,
  BsBookmarkFill,
  BsPerson,
  BsPersonFill,
} from "react-icons/bs";
import { GiEagleHead } from "react-icons/gi";

const style = {
  wrapper: `flex-1 px-8 flex flex-col h-screen sticky top-0 xl:flex-none sm:px-0`,
  twitterIconContainer: `text-3xl m-4`,
  tweetButton: `bg-[#1d9bf0] hover:bg-[#1b8cd8] flex flex-1 items-center justify-center font-bold rounded-3xl h-[50px] mt-[20px] cursor-pointer xl:w-[50px] xl:mx-1`,
  navContainer: `flex-1`,
  profileButton: `flex items-center mb-6 cursor-pointer hover:bg-[#333c45] rounded-[100px] p-2`,
  profileLeft: `flex item-center justify-center mr-4`,
  profileImage: `h-12 w-12 rounded-full object-cover`,
  profileRight: `flex-1 flex xl:hidden`,
  details: `flex-1`,
  name: `text-lg`,
  handle: `text-[#8899a6]`,
  moreContainer: `flex items-center mr-2`,
};

const Sidebar = ({
  initialSelectedIcon = "Home",
  currentAccount,
  currentUser,
  posts,
  setPosts,
}) => {
  const router = useRouter();
  const [selected, setSelected] = useState(initialSelectedIcon);
  const [uploadModalVisible, setUploadModalVisible] = useState(false);
  return (
    <>
      <div className={style.wrapper}>
        <div className={style.twitterIconContainer}>
          <GiEagleHead onClick={() => router.push("/home")} size={"1.5em"} />
        </div>
        <div className={style.navContainer}>
          <SidebarOption
            Icon={selected === "Home" ? RiHome7Fill : RiHome7Line}
            text="Home"
            isActive={Boolean(selected === "Home")}
            setSelected={setSelected}
            redirect={"/home"}
          />
          <SidebarOption
            Icon={selected === "Explore" ? FaHashtag : BiHash}
            text="Explore"
            isActive={Boolean(selected === "Explore")}
            setSelected={setSelected}
            redirect={"/explore"}
          />
          <SidebarOption
            Icon={selected === "Notifications" ? FaBell : FiBell}
            text="Notifications"
            isActive={Boolean(selected === "Notifications")}
            setSelected={setSelected}
            redirect={"/notifications"}
          />
          <SidebarOption
            Icon={selected === "Messages" ? HiMail : HiOutlineMail}
            text="Messages"
            isActive={Boolean(selected === "Messages")}
            setSelected={setSelected}
            redirect={"/messages"}
          />
          <SidebarOption
            Icon={selected === "Bookmarks" ? BsBookmarkFill : BsBookmark}
            text="Bookmarks"
            isActive={Boolean(selected === "Bookmarks")}
            setSelected={setSelected}
            redirect={"/bookmarks"}
          />
          <SidebarOption
            Icon={selected === "Connect" ? RiEarthFill : RiEarthLine}
            text="Connect"
            isActive={Boolean(selected === "Connect")}
            setSelected={setSelected}
            redirect={"/connect"}
          />
          <SidebarOption
            Icon={selected === "Profile" ? BsPersonFill : BsPerson}
            text="Profile"
            isActive={Boolean(selected === "Profile")}
            setSelected={setSelected}
            redirect={`/profile/${currentAccount}`}
          />
          <SidebarOption
            Icon={selected === "More" ? CgDetailsMore : CgMoreO}
            text="More"
            isActive={Boolean(selected === "More")}
            setSelected={setSelected}
            redirect={"/more"}
          />
          <div
            onClick={() => setUploadModalVisible(true)}
            className={style.tweetButton}
          >
            <span className="xl:hidden">Upload</span>
            <FiUpload className="text-2xl hidden xl:block"/>
          </div>
        </div>
        <div
          className={style.profileButton}
          onClick={() => router.push(`/profile/${currentAccount}`)}
        >
          <div className={style.profileLeft}>
            <img
              src={currentUser.profileImage}
              alt="profile"
              className={style.profileImage}
            />
          </div>
          <div className={style.profileRight}>
            <div className={style.details}>
              <div className={style.name}>{currentUser.name}</div>
              <div className={style.handle}>
                @{currentAccount.slice(0, 6)}...{currentAccount.slice(21)}
              </div>
            </div>
            <div className={style.moreContainer}>
              <FiMoreHorizontal />
            </div>
          </div>
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
    </>
  );
};

export default Sidebar;
