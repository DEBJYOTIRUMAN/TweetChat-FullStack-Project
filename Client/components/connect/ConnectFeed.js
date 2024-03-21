import { BsArrowLeft } from "react-icons/bs";
import ConnectUserCard from "./ConnectUserCard";

const style = {
  wrapper: `border-r border-l border-[#38444d] w-[40rem] md:w-[30rem] sm:max-w-[20rem] xs:!max-w-[17rem]`,
  header: `top-0 bg-[#15202b] z-10 p-4 flex items-center`,
  headerTitle: `text-xl font-bold mx-4`,
  section: `bg-[#192734] my-6 rounded-xl overflow-hidden`,
  noConnect: `flex justify-center items-center h-screen bg-[#15202b]`,
  noConnectText: `text-4xl mb-40 font-bold sm:text-xl`,
};

const ConnectFeed = ({
  router,
  currentUser,
  currentAccount,
  allUsers,
  setAllUsers,
  setCurrentUser,
  handleFollow,
}) => {
  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <BsArrowLeft onClick={() => router.back()} size={24} />
        <div className={style.headerTitle}>Connect</div>
      </div>
      <div className={style.section}>
        {allUsers.length <= 1 ? (
          <div className={style.noConnect}>
            <span className={style.noConnectText}>No Connect</span>
          </div>
        ) : (
          allUsers.map(
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
                  handleFollow={handleFollow}
                />
              )
          )
        )}
      </div>
    </div>
  );
};

export default ConnectFeed;
