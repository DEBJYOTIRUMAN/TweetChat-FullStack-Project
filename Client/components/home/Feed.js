import PostBox from "./PostBox";
import { BsStars } from "react-icons/bs";
import Post from "./Post";

const style = {
  wrapper: `border-r border-l border-[#38444d] w-[40rem] md:w-[30rem] sm:max-w-[20rem] xs:!max-w-[17rem]`,
  header: `bg-[#15202b] p-4 flex justify-between items-center`,
  headerTitle: `text-xl font-bold`,
  noPosts: `flex justify-center items-center h-screen`,
  noPostsText: `text-4xl mb-40 font-bold sm:text-xl`,
};

const Feed = ({ token, currentAccount, currentUser, posts, setPosts }) => {
  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <div className={style.headerTitle}>Home</div>
        <BsStars />
      </div>
      <PostBox
        token={token}
        currentAccount={currentAccount}
        posts={posts}
        currentUser={currentUser}
        setPosts={setPosts}
      />
      {posts.length !== 0 ? (
        posts.map((post, index) => (
          <Post
            key={index}
            token={token}
            post={post}
            currentAccount={currentAccount}
            currentUser={currentUser}
            posts={posts}
            setPosts={setPosts}
          />
        ))
      ) : (
        <div className={style.noPosts}>
          <span className={style.noPostsText}>No Posts Found!</span>
        </div>
      )}
    </div>
  );
};

export default Feed;
