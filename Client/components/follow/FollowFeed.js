import { BsArrowLeft } from "react-icons/bs";
import ConnectUserCard from "../connect/ConnectUserCard";

const style = {
  wrapper: `border-r border-l border-[#38444d] w-[40rem] md:w-[30rem] sm:max-w-[20rem] xs:!max-w-[17rem]`,
  header: `top-0 bg-[#15202b] z-10 p-4 flex items-center`,
  headerTitle: `text-xl font-bold mx-4`,
  section: `bg-[#192734] my-6 rounded-xl overflow-hidden`,
  nav: `flex justify-around mt-4 mb-2 font-semibold text-[#8899a6]`,
  activeNav: `text-white font-bold bg-[#1d9bf0]`,
  notFound: `flex justify-center items-center h-screen bg-[#15202b]`,
  notFoundText: `text-3xl mb-40 font-bold sm:text-lg`,
  tabButton: `flex-1 text-center p-2 cursor-pointer rounded-3xl hover:bg-[#313b44]`,
};

const FollowFeed = ({
  router,
  currentUser,
  currentAccount,
  allUsers,
  setAllUsers,
  setCurrentUser,
  activeTab,
  setActiveTab,
  followers,
  following,
  user,
}) => {
  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <BsArrowLeft onClick={() => router.back()} size={24} />
        <div className={style.headerTitle}>{user ? user.name : "Post"}</div>
      </div>
      <div className={style.nav}>
        <div
          className={`${activeTab === "Followers" && style.activeNav} ${style.tabButton}`}
          onClick={() => setActiveTab("Followers")}
        >
          Followers
        </div>
        <div
          className={`${activeTab === "Following" && style.activeNav} ${style.tabButton}`}
          onClick={() => setActiveTab("Following")}
        >
          Following
        </div>
      </div>
      <div className={style.section}>
        {activeTab === "Followers" ? (
          followers.length > 0 ? (
            followers.map(
              (user, index) =>
                user._id !== currentAccount && (
                  <ConnectUserCard
                    key={index}
                    router={router}
                    user={user}
                    currentUser={currentUser}
                    currentAccount={currentAccount}
                    allUsers={allUsers}
                    setAllUsers={setAllUsers}
                    setCurrentUser={setCurrentUser}
                  />
                )
            )
          ) : (
            <div className={style.notFound}>
              <span className={style.notFoundText}>No Followers Found!</span>
            </div>
          )
        ) : following.length > 0 ? (
          following.map(
            (user, index) =>
              user._id !== currentAccount && (
                <ConnectUserCard
                  key={index}
                  router={router}
                  user={user}
                  currentUser={currentUser}
                  currentAccount={currentAccount}
                  allUsers={allUsers}
                  setAllUsers={setAllUsers}
                  setCurrentUser={setCurrentUser}
                />
              )
          )
        ) : (
          <div className={style.notFound}>
            <h1 className={style.notFoundText}>You don't follow anyone!</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default FollowFeed;
