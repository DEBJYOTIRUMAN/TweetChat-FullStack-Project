import { AiOutlineClose } from "react-icons/ai";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { format } from "timeago.js";

const style = {
  wrapper: `flex p-3 border-b border-[#38444d] relative sm:flex-col`,
  profileImage: `h-[40px] w-[40px] rounded-full object-cover`,
  postMain: `flex-1 px-4`,
  headerDetails: `flex items-center sm:block`,
  headerDetailsName: `flex items-center`,
  name: `font-bold mr-1 sm:ml-0`,
  verified: `text-[0.8rem]`,
  handleAndTimeAgo: `text-[#8899a6] ml-1 sm:ml-0`,
  tweet: `my-2`,
  closeButton: `flex-1 flex justify-end sm:absolute sm:right-6 sm:top-6`,
};

const Comment = ({
  token,
  comment,
  currentAccount,
  post,
  posts,
  setPosts,
  router,
}) => {
  const deleteComment = async () => {
    await post.comments.splice(post.comments.indexOf(comment), 1);
    fetch(`https://tweetchat-1y3f.onrender.com/api/post/comment/${post._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.access_token}`,
      },
      body: JSON.stringify({
        comments: post.comments,
      }),
    })
      .then((res) => res.json())
      .then((document) => {
        setPosts(
          posts.map((item) => (item._id === document._id ? document : item))
        );
      });
  };
  return (
    <div className={style.wrapper}>
      <div
        onClick={() => router.push(`/profile/${comment.userId}`)}
        className="sm:mx-3"
      >
        <img
          src={comment.profileImage}
          alt={comment.userName}
          className={style.profileImage}
        />
      </div>
      <div className={style.postMain}>
        <span className={style.headerDetails}>
          <span className={style.headerDetailsName}>
            <span className={style.name}>{comment.userName}</span>
            <span className={style.verified}>
              <BsFillPatchCheckFill />
            </span>
          </span>
          <span className={style.handleAndTimeAgo}>
            @{`${comment.userId.slice(0, 4)}...${comment.userId.slice(-4)}`} •{" "}
            {format(new Date(comment.createdAt).getTime())}
          </span>
          <span className={style.closeButton}>
            {comment.userId === currentAccount && (
              <AiOutlineClose onClick={() => deleteComment()} />
            )}
          </span>
        </span>
        <div className={style.tweet}>{comment.comment}</div>
      </div>
    </div>
  );
};

export default Comment;
