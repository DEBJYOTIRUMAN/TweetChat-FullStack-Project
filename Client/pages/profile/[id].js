import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfileContent from "../../components/profile/ProfileContent";
import Sidebar from "../../components/home/Sidebar";
import Widgets from "../../components/home/Widgets";
import { TweetChatContext } from "../../context/TweetChatContext";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/messages/Common/Layout";

const style = {
  wrapper: `flex justify-center min-h-screen min-w-screen select-none bg-[#15202b] text-white`,
  content: `max-w-[1400px] flex justify-between`,
  mainContent: `border-r border-l border-[#38444d] w-[40rem] md:w-[30rem] sm:max-w-[20rem] xs:!max-w-[17rem]`,
};

const profile = () => {
  const {
    token,
    setToken,
    currentUser,
    setCurrentUser,
    currentAccount,
    posts,
    setPosts,
    allUsers,
    setAllUsers,
    news,
    handleFollow,
    videoCall,
    voiceCall,
    socket,
  } = useContext(TweetChatContext);
  const router = useRouter();
  const { id } = router.query;
  const [activeTab, setActiveTab] = useState("Posts");
  const [renderPosts, setRenderPosts] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    if (activeTab === "Posts") {
      setRenderPosts(posts.filter((item) => item.userId === id));
    } else if (activeTab === "Reposts") {
      setRenderPosts(posts.filter((item) => item.reposts.includes(id)));
    } else if (activeTab === "Media") {
      setRenderPosts(
        posts.filter((item) => item.userId === id && item.imageUrl)
      );
    } else if (activeTab === "Likes") {
      setRenderPosts(posts.filter((item) => item.likes.includes(id)));
    } else return;
  }, [activeTab, posts, id]);

  useEffect(() => {
    setUser(allUsers.find((item) => item._id === id));
  }, [allUsers, id]);

  return (
    <Layout>
      {!videoCall && !voiceCall && (
        <div className={style.wrapper}>
          <div className={style.content}>
            <Sidebar
              initialSelectedIcon={"Profile"}
              currentAccount={currentAccount}
              currentUser={currentUser}
              posts={posts}
              setPosts={setPosts}
            />
            <div className={style.mainContent}>
              <ProfileHeader
                token={token}
                setToken={setToken}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                currentAccount={currentAccount}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                renderPosts={renderPosts}
                allUsers={allUsers}
                setAllUsers={setAllUsers}
                id={id}
                user={user}
                handleFollow={handleFollow}
                socket={socket}
              />
              <ProfileContent
                currentAccount={currentAccount}
                currentUser={currentUser}
                posts={posts}
                setPosts={setPosts}
                renderPosts={renderPosts}
                activeTab={activeTab}
              />
            </div>
            <Widgets
              currentUser={currentUser}
              currentAccount={currentAccount}
              allUsers={allUsers}
              setAllUsers={setAllUsers}
              setCurrentUser={setCurrentUser}
              news={news}
              handleFollow={handleFollow}
            />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default profile;
