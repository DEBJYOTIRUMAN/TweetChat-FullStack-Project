import { AiOutlineClose } from "react-icons/ai";

const style = {
  wrapper: `h-[20rem] w-[35rem] text-white bg-[#15202b] rounded-3xl px-10 py-5 flex flex-col sm:w-[20rem]`,
  container: `flex-1 flex justify-center items-center`,
};

const ComingSoonModal = ({ setComingSoon }) => {
  return (
    <div className={style.wrapper}>
      <div className="flex items-center justify-end">
        <div
          className="w-9 h-9 flex items-center justify-center"
          onClick={() => setComingSoon(false)}
        >
          <AiOutlineClose size={22} />
        </div>
      </div>
      <div className={style.container}>
        <span className="mb-10 font-bold text-3xl">COMING SOON</span>
      </div>
    </div>
  );
};

export default ComingSoonModal;
