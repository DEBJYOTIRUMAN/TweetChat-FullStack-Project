import { BsArrowLeft } from "react-icons/bs";
import Post from "../home/Post";
import Comment from "./Comment";

const style = {
  wrapper: `border-r border-l border-[#38444d] w-[40rem] md:w-[30rem] sm:max-w-[20rem] xs:!max-w-[17rem]`,
  header: `top-0 bg-[#15202b] z-10 p-4 flex items-center`,
  headerTitle: `text-xl font-bold mx-4`,
};

const PostFeed = ({ token, post, router, currentAccount, currentUser, posts, setPosts }) => {
  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <BsArrowLeft onClick={() => router.back()} size={24} />
        <div className={style.headerTitle}>Post</div>
      </div>

      <Post token={token} post={post} currentAccount={currentAccount} currentUser={currentUser} posts={posts} setPosts={setPosts} />
      {post && post.comments ? post.comments.length > 0 && (
            <div className="pb-72">
              {post.comments.map((comment, index) => (
                <Comment
                  key={index}
                  token={token}
                  comment={comment}
                  currentAccount={currentAccount}
                  post={post}
                  posts={posts}
                  setPosts={setPosts}
                  router={router}
                />
              )).reverse()}
            </div>
          ) : null}
    </div>
  );
};

export default PostFeed;
