import { useContext } from "react";
import { TweetChatContext } from "../context/TweetChatContext";
import Feed from "../components/home/Feed";
import Sidebar from "../components/home/Sidebar";
import Widgets from "../components/home/Widgets";
import Layout from "../components/messages/Common/Layout";

const style = {
  wrapper: `flex justify-center min-h-screen min-w-screen select-none bg-[#15202b] text-white`,
  content: `max-w-[1400px] flex justify-between`,
};

const home = () => {
  const {
    token,
    currentAccount,
    currentUser,
    setCurrentUser,
    posts,
    setPosts,
    allUsers,
    setAllUsers,
    news,
    handleFollow,
    videoCall,
    voiceCall,
  } = useContext(TweetChatContext);

  return (
    <Layout>
      {!videoCall && !voiceCall && (
        <div className={style.wrapper}>
          <div className={style.content}>
            <Sidebar
              currentAccount={currentAccount}
              currentUser={currentUser}
              posts={posts}
              setPosts={setPosts}
            />
            <Feed
              token={token}
              currentAccount={currentAccount}
              currentUser={currentUser}
              posts={posts}
              setPosts={setPosts}
            />
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

export default home;
