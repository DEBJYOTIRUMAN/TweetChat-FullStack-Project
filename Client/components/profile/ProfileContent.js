import Post from "../home/Post";

const style = {
  wrapper: `no-scrollbar`,
  notFound: `text-2xl font-bold text-center text-white mt-4 sm:text-xl`,
};

const ProfileContent = ({
  currentAccount,
  currentUser,
  posts,
  setPosts,
  renderPosts,
  activeTab,
}) => {
  return (
    <div className={style.wrapper}>
      {renderPosts.length !== 0 ? (
        renderPosts.map((post, index) => (
          <Post
            key={index}
            post={post}
            currentAccount={currentAccount}
            currentUser={currentUser}
            posts={posts}
            setPosts={setPosts}
          />
        ))
      ) : (
        <div>
          <h1 className={style.notFound}>No {activeTab} Found!</h1>
        </div>
      )}
    </div>
  );
};

export default ProfileContent;
