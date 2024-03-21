import Sidebar from "../../components/home/Sidebar";
import Widgets from "../../components/home/Widgets";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { TweetChatContext } from "../../context/TweetChatContext";
import PostFeed from "../../components/postpage/PostFeed";
import Layout from "../../components/messages/Common/Layout";

const style = {
  wrapper: `flex justify-center min-h-screen min-w-screen select-none bg-[#15202b] text-white`,
  content: `max-w-[1400px] flex justify-between`,
};

const PostPage = () => {
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
  const [post, setPost] = useState({});
  useEffect(() => {
    setPost(posts.find((item) => item._id === id));
  }, [posts]);
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
            <PostFeed
              token={token}
              post={post}
              router={router}
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

export default PostPage;
