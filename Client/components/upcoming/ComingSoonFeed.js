import { BsArrowLeft } from "react-icons/bs";

const style = {
  wrapper: `border-r border-l border-[#38444d] w-[40rem] md:w-[30rem] sm:max-w-[20rem] xs:!max-w-[17rem]`,
  header: `top-0 bg-[#15202b] z-10 p-4 flex items-center`,
  headerTitle: `text-xl font-bold mx-4`,
  section: `flex justify-center items-center h-screen`,
  text: `text-4xl mb-20 font-bold sm:text-2xl`,
};

const ComingSoonFeed = ({ router, initialSelectedScreen }) => {
  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <BsArrowLeft onClick={() => router.back()} size={24} />
        <div className={style.headerTitle}>{initialSelectedScreen}</div>
      </div>
      <div className={style.section}>
        <span className={style.text}>COMING SOON</span>
      </div>
    </div>
  );
};

export default ComingSoonFeed;
