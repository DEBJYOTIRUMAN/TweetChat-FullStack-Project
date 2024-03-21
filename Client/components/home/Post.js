import { BsFillPatchCheckFill, BsBookmark } from "react-icons/bs";
import { FaRegComment, FaRetweet, FaTrash, FaRegListAlt } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { FiDownload } from "react-icons/fi";
import { format } from "timeago.js";
import { useState } from "react";
import Modal from "react-modal";
import CommentModal from "./CommentModal";
import { customStyles, imageModalStyles } from "../../lib/constants";
import { useRouter } from "next/router";
import ShowImageModal from "./ShowImageModal";
import ComingSoonModal from "./ComingSoonModal";
import { downloadImage } from "../../lib/download";

const style = {
  wrapper: `flex p-3 border-b border-[#38444d] sm:flex-col`,
  profileImage: `h-[40px] w-[40px] rounded-full object-cover`,
  postMain: `flex-1 px-4`,
  headerDetails: `flex items-center sm:block`,
  headerNameDetails: `flex items-center`,
  name: `font-bold mr-1`,
  verified: `text-[0.8rem]`,
  handleAndTimeAgo: `text-[#8899a6] ml-1 sm:ml-0`,
  tweet: `my-2`,
  image: `rounded-3xl`,
  footer: `flex justify-between mr-28 mt-4 text-[#8899a6]`,
  footerIcon: `rounded-full text-lg p-2`,
  wrapFooterIcon: `flex items-center space-x-1 group`,
  postImage: `rounded-2xl max-h-[400px] w-full object-contain bg-black`,
  postVerified: `absolute top-4 right-4 text-[#1d9bf0]`,
};

const Post = ({
  token,
  post,
  currentAccount,
  currentUser,
  posts,
  setPosts,
}) => {
  const [commentModal, setCommentModal] = useState(false);
  const router = useRouter();
  const pathName = router.pathname;
  const [showImage, setShowImage] = useState(false);
  const [comingSoon, setComingSoon] = useState(false);

  const likePost = async () => {
    let likes = post.likes;
    if (!likes.includes(currentAccount)) {
      likes.push(currentAccount);
    } else {
      likes = likes.filter((item) => item !== currentAccount);
    }
    let url = `https://tweetchat-1y3f.onrender.com/api/post/like/${post._id}`;
    if (pathName === "/explore") {
      url = `https://tweetchat-1y3f.onrender.com/api/news/like/${post._id}`;
    }
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.access_token}`,
      },
      body: JSON.stringify({
        likes: likes,
      }),
    })
      .then((res) => res.json())
      .then((document) => {
        setPosts(
          posts.map((item) => (item._id === document._id ? document : item))
        );
      });
  };

  const handleRepost = async () => {
    let reposts = post.reposts;
    if (!reposts.includes(currentAccount)) {
      reposts.push(currentAccount);
    } else {
      reposts = reposts.filter((item) => item !== currentAccount);
    }
    fetch(`https://tweetchat-1y3f.onrender.com/api/post/repost/${post._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.access_token}`,
      },
      body: JSON.stringify({
        reposts: reposts,
      }),
    })
      .then((res) => res.json())
      .then((document) => {
        setPosts(
          posts.map((item) => (item._id === document._id ? document : item))
        );
      });
  };

  const deletePost = async () => {
    fetch(`https://tweetchat-1y3f.onrender.com/api/post/${post._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    })
      .then((res) => res.json())
      .then((document) => {
        setPosts(posts.filter((item) => item._id !== document._id));
        if (pathName === "/post/[id]") {
          router.push("/home");
        }
      });
  };

  return post ? (
    Object.keys(post).length !== 0 ? (
      <>
        <div className={style.wrapper}>
          <div
            onClick={() => router.push(`/profile/${post.userId}`)}
            className="sm:mx-3"
          >
            <img
              src={post.profileImage}
              alt={post.userName}
              className={style.profileImage}
            />
          </div>
          <div className={style.postMain}>
            <div
              onClick={() =>
                pathName !== "/post/[id]" && pathName !== "/explore"
                  ? router.push(`/post/${post._id}`)
                  : null
              }
            >
              <span className={style.headerDetails}>
                <span className={style.headerNameDetails}>
                  <span className={style.name}>{post.userName}</span>
                  <span className={style.verified}>
                    <BsFillPatchCheckFill />
                  </span>
                </span>
                <span className={style.handleAndTimeAgo}>
                  @{`${post.userId.slice(0, 4)}...${post.userId.slice(-4)}`} •{" "}
                  {format(new Date(post.createdAt).getTime())}
                </span>
              </span>
              <div className={style.tweet}>{post.caption}</div>
              <div className="relative">
                {post.imageUrl && (
                  <img
                    src={post.imageUrl}
                    alt="Post Image"
                    className={style.postImage}
                    onClick={() =>
                      pathName === "/post/[id]" || pathName === "/explore"
                        ? setShowImage(true)
                        : null
                    }
                  />
                )}
                {post.imageUrl && (
                  <span className={style.postVerified}>
                    <BsFillPatchCheckFill size={20} />
                  </span>
                )}
              </div>
            </div>
            <div className={style.footer}>
              {pathName !== "/explore" ? (
                <>
                  <div
                    className={style.wrapFooterIcon}
                    onClick={() => setCommentModal(true)}
                  >
                    <div
                      className={`${style.footerIcon} hover:text-[#1d9bf0] hover:bg-[#1e364a]`}
                    >
                      <FaRegComment />
                    </div>
                    {post.comments.length > 0 && (
                      <span className={"group-hover:text-[#1d9bf0] text-sm"}>
                        {post.comments.length}
                      </span>
                    )}
                  </div>
                  {post.userId === currentAccount ? (
                    <div
                      className={style.wrapFooterIcon}
                      onClick={() => deletePost()}
                    >
                      <div
                        className={`${style.footerIcon} group-hover:bg-red-600/10`}
                      >
                        <FaTrash className="group-hover:text-red-600" />
                      </div>
                    </div>
                  ) : (
                    <div
                      className={style.wrapFooterIcon}
                      onClick={() => handleRepost()}
                    >
                      <div
                        className={`${style.footerIcon} hover:text-[#03ba7c] hover:bg-[#1b393b]`}
                      >
                        {post.reposts.includes(currentAccount) ? (
                          <FaRetweet className="text-green-500" />
                        ) : (
                          <FaRetweet />
                        )}
                      </div>
                      {post.reposts.length > 0 && (
                        <span
                          className={`group-hover:text-green-500 text-sm ${
                            post.reposts.includes(currentAccount) &&
                            "text-green-500"
                          }`}
                        >
                          {post.reposts.length}
                        </span>
                      )}
                    </div>
                  )}

                  <div
                    className={style.wrapFooterIcon}
                    onClick={() => likePost()}
                  >
                    <div
                      className={`${style.footerIcon} hover:text-[#f91c80] hover:bg-[#39243c]`}
                    >
                      {post.likes.includes(currentAccount) ? (
                        <AiOutlineHeart className="text-pink-600" />
                      ) : (
                        <AiOutlineHeart />
                      )}
                    </div>
                    {post.likes.length > 0 && (
                      <span
                        className={`group-hover:text-pink-600 text-sm ${
                          post.likes.includes(currentAccount) && "text-pink-600"
                        }`}
                      >
                        {post.likes.length}
                      </span>
                    )}
                  </div>
                  <div
                    className={`${style.footerIcon} hover:text-[#1d9bf0] hover:bg-[#1e364a]`}
                    onClick={() =>
                      post.imageUrl
                        ? downloadImage(post._id, post.imageUrl)
                        : null
                    }
                  >
                    <FiDownload />
                  </div>
                </>
              ) : (
                <>
                  <div
                    className={style.wrapFooterIcon}
                    onClick={() => likePost()}
                  >
                    <div
                      className={`${style.footerIcon} hover:text-[#f91c80] hover:bg-[#39243c]`}
                    >
                      {post.likes.includes(currentAccount) ? (
                        <AiOutlineHeart className="text-pink-600" />
                      ) : (
                        <AiOutlineHeart />
                      )}
                    </div>
                    {post.likes.length > 0 && (
                      <span
                        className={`group-hover:text-pink-600 text-sm ${
                          post.likes.includes(currentAccount) && "text-pink-600"
                        }`}
                      >
                        {post.likes.length}
                      </span>
                    )}
                  </div>
                  <div
                    className={`${style.footerIcon} hover:bg-[#1e364a]`}
                    onClick={() => setComingSoon(true)}
                  >
                    <FaRegListAlt />
                  </div>
                  <div
                    className={`${style.footerIcon} hover:bg-[#1b393b]`}
                    onClick={() => setComingSoon(true)}
                  >
                    <BsBookmark />
                  </div>
                  <div
                    className={`${style.footerIcon} hover:bg-[#1e364a]`}
                    onClick={() =>
                      post.imageUrl
                        ? downloadImage(post._id, post.imageUrl)
                        : null
                    }
                  >
                    <FiDownload />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        {/* Comment Modal */}
        <Modal
          isOpen={commentModal}
          onRequestClose={() => setCommentModal(false)}
          style={customStyles}
        >
          <CommentModal
            token={token}
            post={post}
            currentAccount={currentAccount}
            currentUser={currentUser}
            setCommentModal={setCommentModal}
            posts={posts}
            setPosts={setPosts}
            router={router}
            pathName={pathName}
          />
        </Modal>
        {/* Image Modal */}
        <Modal
          isOpen={showImage}
          onRequestClose={() => setShowImage(false)}
          style={imageModalStyles}
        >
          <ShowImageModal setShowImage={setShowImage} image={post.imageUrl} />
        </Modal>
        {/* Coming Soon Modal */}
        <Modal
          isOpen={comingSoon}
          onRequestClose={() => setComingSoon(false)}
          style={customStyles}
        >
          <ComingSoonModal setComingSoon={setComingSoon} />
        </Modal>
      </>
    ) : (
      <></>
    )
  ) : (
    <></>
  );
};

export default Post;
