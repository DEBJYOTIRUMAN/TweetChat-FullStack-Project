import { useRouter } from "next/router";
import { useContext } from "react";
import Sidebar from "../components/home/Sidebar";
import Widgets from "../components/home/Widgets";
import ComingSoonFeed from "../components/upcoming/ComingSoonFeed";
import { TweetChatContext } from "../context/TweetChatContext";
import Layout from "../components/messages/Common/Layout";

const style = {
  wrapper: `flex justify-center min-h-screen min-w-screen select-none bg-[#15202b] text-white`,
  content: `max-w-[1400px] flex justify-between`,
};

const notifications = () => {
  const {
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
  } = useContext(TweetChatContext);
  const router = useRouter();
  const initialSelectedScreen = "Notifications";
  return (
    <Layout>
      {!videoCall && !voiceCall && (
        <div className={style.wrapper}>
          <div className={style.content}>
            <Sidebar
              initialSelectedIcon={initialSelectedScreen}
              currentAccount={currentAccount}
              currentUser={currentUser}
              posts={posts}
              setPosts={setPosts}
            />
            <ComingSoonFeed
              router={router}
              initialSelectedScreen={initialSelectedScreen}
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

export default notifications;
