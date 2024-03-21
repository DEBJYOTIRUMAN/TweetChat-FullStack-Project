import Sidebar from "../../components/home/Sidebar";
import Widgets from "../../components/home/Widgets";
import { TweetChatContext } from "../../context/TweetChatContext";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import FollowFeed from "../../components/follow/FollowFeed";
import Layout from "../../components/messages/Common/Layout";

const style = {
  wrapper: `flex justify-center min-h-screen min-w-screen select-none bg-[#15202b] text-white`,
  content: `max-w-[1400px] flex justify-between`,
};

const follow = () => {
  const {
    token,
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
  const { id } = router.query;
  const [activeTab, setActiveTab] = useState("Followers");
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const user = allUsers.find((user) => user._id === id);
  useEffect(() => {
    if (!user) return;
    if (activeTab === "Followers") {
      fetch("https://tweetchat-1y3f.onrender.com/api/user/followers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access_token}`,
        },
        body: JSON.stringify({
          followers: user.followers,
        }),
      })
        .then((res) => res.json())
        .then((documents) => {
          setFollowers(documents);
        });
    } else {
      fetch("https://tweetchat-1y3f.onrender.com/api/user/following", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access_token}`,
        },
        body: JSON.stringify({
          following: user.following,
        }),
      })
        .then((res) => res.json())
        .then((documents) => {
          setFollowing(documents);
        });
    }
  }, [activeTab, user]);

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
            <FollowFeed
              router={router}
              currentUser={currentUser}
              currentAccount={currentAccount}
              allUsers={allUsers}
              setAllUsers={setAllUsers}
              setCurrentUser={setCurrentUser}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              followers={followers}
              following={following}
              user={user}
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

export default follow;
