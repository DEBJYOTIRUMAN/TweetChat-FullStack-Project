import check from "../assets/check.png";
import Image from "next/image";
const style = {
  wrapper: `flex justify-center items-center h-screen w-screen select-none bg-[#15202b] text-white`,
  loginContainer: `flex flex-col justify-center items-center px-5 mb-20`,
  loginContent: `text-3xl font-bold text-center mt-10 sm:text-xl`,
};
const verification = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.loginContainer}>
        <Image
          src={check}
          alt="Image"
          width={200}
          height={200}
          className="sm:hidden"
          priority
        />
        <Image
          src={check}
          alt="Image"
          width={160}
          height={160}
          className="hidden sm:block"
          priority
        />
        <div className={style.loginContent}>
          We've sent you a link to Reset Password. Please check your email and
          click the link.
        </div>
      </div>
    </div>
  );
};

export default verification;
