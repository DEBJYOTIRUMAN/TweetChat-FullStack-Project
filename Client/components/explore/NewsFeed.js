import { BsArrowLeft } from "react-icons/bs";
import Post from "../home/Post";
const style = {
  wrapper: `border-r border-l border-[#38444d] w-[40rem] md:w-[30rem] sm:max-w-[20rem] xs:!max-w-[17rem]`,
  header: `top-0 bg-[#15202b] z-10 p-4 flex items-center`,
  headerTitle: `text-xl font-bold mx-4`,
  noNews: `flex justify-center items-center h-screen`,
  noNewsText: `text-4xl mb-40 font-bold sm:text-xl`,
};

const NewsFeed = ({ router, currentUser, currentAccount, news, setNews }) => {
  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <BsArrowLeft onClick={() => router.back()} size={24} />
        <div className={style.headerTitle}>Explore</div>
      </div>
      {news.length !== 0 ? (
        news.map((item, index) => (
          <Post
            key={index}
            post={item}
            currentAccount={currentAccount}
            currentUser={currentUser}
            posts={news}
            setPosts={setNews}
          />
        ))
      ) : (
        <div className={style.noNews}>
          <span className={style.noNewsText}>No News Found!</span>
        </div>
      )}
    </div>
  );
};

export default NewsFeed;
