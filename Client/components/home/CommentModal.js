import { useState } from "react";
import { GiEarthAmerica } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { format } from "timeago.js";

const style = {
  wrapper: `h-[20rem] w-[35rem] text-white bg-[#15202b] rounded-3xl flex flex-col sm:w-[20rem] sm:h-[25rem] sm:mt-20`,
  divider: `flex items-center px-1.5 py-2 border-b border-gray-700`,
  closeButton: `hoverAnimation w-9 h-9 flex items-center justify-center`,
  container: `flex px-4 pt-5 pb-2.5`,
  body: `w-full`,
  header: `text-[#6e767d] flex gap-x-3 relative`,
  imageContainer: `sm:h-16 sm:w-16`,
  image: `h-11 w-11 rounded-full object-cover`,
  headerDiv: `inline-block group sm:block`,
  userName: `font-bold text-[#d9d9d9] inline-block text-[15px]`,
  checkFill: `ml-1.5 text-sm inline-block align-middle mb-0.5`,
  checkIcon: `text-[#1d9bf0] text-[0.8rem]`,
  headerSpan: `hover:underline text-sm`,
  caption: `text-[#d9d9d9] text-[15px]`,
  inputContainer: `mt-7 flex space-x-3 w-full`,
  inputBox: `flex-grow mt-2`,
  input: `bg-transparent outline-none text-[#d9d9d9] text-lg placeholder-gray-500 tracking-wide w-full min-h-[80px]`,
  footer: `flex items-center justify-between pt-2.5`,
  footerLeft: `flex items-center text-[#1d9bf0] text-sm font-bold sm:text-xs`,
  footerLeftText: `ml-2`,
  footerButton: `bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default sm:text-sm`,
};
const CommentModal = ({
  token,
  post,
  currentAccount,
  currentUser,
  setCommentModal,
  posts,
  setPosts,
  router,
  pathName,
}) => {
  const [comment, setComment] = useState("");
  let postComments = post.comments;
  const handleComment = async (event) => {
    event.preventDefault();
    if (comment.length < 1) return;
    await postComments.push({
      userName: currentUser.name,
      userId: currentAccount,
      profileImage: currentUser.profileImage,
      comment: comment,
      createdAt: new Date(Date.now()).toISOString(),
    });
    fetch(`https://tweetchat-1y3f.onrender.com/api/post/comment/${post._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.access_token}`,
      },
      body: JSON.stringify({
        comments: postComments,
      }),
    })
      .then((res) => res.json())
      .then((document) => {
        setPosts(
          posts.map((item) => (item._id === document._id ? document : item))
        );
        setCommentModal(false);
        if (pathName !== "/post/[id]") router.push(`/post/${document._id}`);
      });
  };

  return (
    <div className={style.wrapper}>
      <div className={style.divider}>
        <div
          className={style.closeButton}
          onClick={() => setCommentModal(false)}
        >
          <AiOutlineClose size={22} />
        </div>
      </div>
      <div className={style.container}>
        <div className={style.body}>
          <div className={style.header}>
            <div className={style.imageContainer}>
              <img
                src={post.profileImage}
                alt="Image"
                className={style.image}
                onClick={() => router.push(`/profile/${post.userId}`)}
              />
            </div>
            <div>
              <div className={style.headerDiv}>
                <h4 className={style.userName}>{post.userName}</h4>
                <span className={style.checkFill}>
                  {<BsFillPatchCheckFill className={style.checkIcon} />}
                </span>
              </div>{" "}
              <span className={style.headerSpan}>
                @{`${post.userId.slice(0, 4)}...${post.userId.slice(-4)}`} •{" "}
                {format(new Date(post.createdAt).getTime())}
              </span>
              <p className={style.caption}>{post.caption}</p>
            </div>
          </div>

          <div className={style.inputContainer}>
            <img
              src={currentUser.profileImage}
              alt="Image"
              className={style.image}
              onClick={() => router.push(`/profile/${currentAccount}`)}
            />
            <div className={style.inputBox}>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Post your reply"
                rows="2"
                className={style.input}
              />

              <div className={style.footer}>
                <div className={style.footerLeft}>
                  <GiEarthAmerica />
                  <span className={style.footerLeftText}>
                    Everyone can see this
                  </span>
                </div>
                <button
                  className={style.footerButton}
                  type="submit"
                  onClick={(event) => handleComment(event)}
                  disabled={!comment.trim()}
                >
                  Reply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
