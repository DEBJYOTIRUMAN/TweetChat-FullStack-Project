import { BiSearch } from "react-icons/bi";
import { useRouter } from "next/router";
import UserCard from "../../components/home/UserCard";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const style = {
  wrapper: `flex-1 p-4 lg:hidden`,
  searchBar: `flex items-center bg-[#243340] p-2 rounded-3xl`,
  searchIcon: `text-[#8899a6] mx-2`,
  inputBox: `flex-1 bg-transparent outline-none`,
  section: `bg-[#192734] my-6 rounded-xl overflow-hidden`,
  title: `p-2 font-bold text-lg`,
  showMore: `p-2 text-[#1d9bf0] text-sm cursor-pointer hover:bg-[#22303c]`,
  item: `flex items-center p-3 my-2 hover:bg-[#22303c] cursor-pointer`,
  newsItemLeft: `flex-1`,
  newsItemCategory: `text-[#8899a6] text-xs font-semibold`,
  newsItemTitle: `text-sm font-bold`,
  newsItemRight: `w-1/5 ml-3`,
  newsItemImage: `rounded-xl h-14 w-14 object-cover`,
};

function Widgets({
  currentUser,
  currentAccount,
  allUsers,
  setAllUsers,
  setCurrentUser,
  news,
  handleFollow,
}) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [searchList, setSearchList] = useState([]);
  useEffect(() => {
    if (name.length < 3) return;
    setSearchList(allUsers.filter((user) => user.name.includes(name)));
  }, [name, allUsers]);
  return (
    <>
      <div className={style.wrapper}>
        <div className={style.searchBar}>
          <BiSearch className={style.searchIcon} />
          <input
            placeholder="Search TweetChat"
            type="text"
            className={style.inputBox}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <AiOutlineClose
            className={style.searchIcon}
            onClick={() => {
              setSearchList([]);
              setName("");
            }}
          />
        </div>
        {searchList.length > 0 && name.length > 2 && (
          <div className={style.section}>
            {searchList.map(
              (user, index) =>
                user._id !== currentAccount && (
                  <UserCard
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
            )}
          </div>
        )}
        <div className={style.section}>
          <div className={style.title}>What's happening</div>
          {news.map(
            (item, index) =>
              index < 4 && (
                <div
                  key={index}
                  className={style.item}
                  onClick={() => router.push("/explore")}
                >
                  <div className={style.newsItemLeft}>
                    <div
                      className={style.newsItemCategory}
                    >{`${item.userName} • Admin • TweetChat`}</div>
                    <div className={style.newsItemTitle}>{item.caption}</div>
                  </div>
                  <div className={style.newsItemRight}>
                    <img
                      src={item.imageUrl}
                      alt="Image"
                      className={style.newsItemImage}
                    />
                  </div>
                </div>
              )
          )}
          <div
            className={style.showMore}
            onClick={() => router.push("/explore")}
          >
            Show more
          </div>
        </div>

        <div className={style.section}>
          <div className={style.title}>Who to follow</div>
          {allUsers.map(
            (user, index) =>
              user._id !== currentAccount &&
              index < 3 && (
                <UserCard
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
          )}
          <div
            className={style.showMore}
            onClick={() => router.push("/connect")}
          >
            Show more
          </div>
        </div>
      </div>
    </>
  );
}

export default Widgets;
