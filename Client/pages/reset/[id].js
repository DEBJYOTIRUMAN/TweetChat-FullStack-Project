import { Formik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import resetImage from "../../assets/reset.jpg";
import { TweetChatContext } from "../../context/TweetChatContext";
import { useRouter } from "next/router";
import error from "../../assets/error.png";
import Image from "next/image";

const reset = () => {
  const { setToken } = useContext(TweetChatContext);
  const router = useRouter();
  const { id } = router.query;
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!id) return;
    fetch(`https://tweetchat-1y3f.onrender.com/api/link/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.email) {
          return;
        }
        setEmail(data.email);
      });
  }, [id]);

  const initialValues = {
    newPassword: "",
    confirmPassword: "",
  };

  const resetPassword = (values) => {
    fetch("https://tweetchat-1y3f.onrender.com/api/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: values.newPassword,
        confirmPassword: values.confirmPassword,
      }),
    })
      .then((res) => res.json())
      .then((token) => {
        if (!token.access_token) {
          return;
        }
        setToken(token);
        router.push("/home");
      });
  };

  const addLoginSchema = Yup.object().shape({
    newPassword: Yup.string()
      .required("Please enter new password.")
      .min(6, "Password must have at least 6 characters.")
      .max(20, "Password has reached the character limit."),
    confirmPassword: Yup.string()
      .required("Please enter confirm password.")
      .oneOf([Yup.ref("newPassword"), null], "Password didn’t match."),
  });
  return email.length !== 0 ? (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        resetPassword(values);
      }}
      validationSchema={addLoginSchema}
    >
      {({
        handleBlur,
        handleChange,
        handleSubmit,
        values,
        errors,
        touched,
        isValid,
      }) => (
        <div className="bg-gray-900">
          <div className="flex justify-center h-screen">
            <div
              className="bg-cover w-2/3 xl:w-1/2 sm:hidden"
              style={{
                backgroundImage: `url(${resetImage.src})`,
              }}
            ></div>

            <div className="flex items-center max-w-md px-6 mx-auto w-2/6 xl:w-1/2 sm:flex-1">
              <div className="flex-1">
                <div className="text-center">
                  <h2 className="text-4xl font-bold text-center text-white">
                    Reset Password
                  </h2>

                  <p className="mt-3 text-gray-300">
                    Change your password to access your account
                  </p>
                </div>

                <div className="mt-8">
                  <div>
                    <div className="mb-2">
                      <label
                        htmlFor="newPassword"
                        className="text-sm text-gray-200"
                      >
                        New Password
                      </label>
                    </div>
                    <input
                      type="password"
                      name="newPassword"
                      id="newPassword"
                      placeholder="Enter New Password"
                      className="block w-full px-4 py-2 mt-2 border rounded-md placeholder-gray-600 bg-gray-900 text-gray-300 border-gray-700 focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      onChange={handleChange("newPassword")}
                      onBlur={handleBlur("newPassword")}
                      value={values.newPassword}
                    />
                    {errors.newPassword && touched.newPassword ? (
                      <p className="text-red-600 font-medium">
                        {errors.newPassword}
                      </p>
                    ) : null}
                  </div>

                  <div className="mt-6">
                    <div className="mb-2">
                      <label
                        htmlFor="confirmPassword"
                        className="text-sm text-gray-200"
                      >
                        Confirm Password
                      </label>
                    </div>
                    <input
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      placeholder="Confirm Your Password"
                      className="block w-full px-4 py-2 mt-2 border rounded-md placeholder-gray-600 bg-gray-900 text-gray-300 border-gray-700 focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      onChange={handleChange("confirmPassword")}
                      onBlur={handleBlur("confirmPassword")}
                      value={values.confirmPassword}
                    />
                    {errors.confirmPassword && touched.confirmPassword ? (
                      <p className="text-red-600 font-medium">
                        {errors.confirmPassword}
                      </p>
                    ) : null}
                  </div>

                  <div className="mt-6">
                    <button
                      type="button"
                      className={`w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50 ${
                        !isValid &&
                        "text-gray-300 bg-gray-800 cursor-not-allowed hover:bg-gray-800"
                      }`}
                      onClick={handleSubmit}
                      disabled={!isValid}
                    >
                      Reset Password
                    </button>
                  </div>

                  <p className="mt-6 text-sm text-center text-gray-400">
                    Remember your password?{" "}
                    <Link
                      href="/login"
                      className="text-blue-500 focus:outline-none focus:underline hover:underline"
                    >
                      Log in
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Formik>
  ) : (
    <div className="flex justify-center items-center h-screen w-screen select-none bg-[#15202b] text-white">
      <div className="flex flex-col justify-center items-center px-5 mb-20">
        <Image
          src={error}
          alt="Image"
          width={200}
          height={200}
          className="sm:hidden"
          priority
        />
        <Image
          src={error}
          alt="Image"
          width={160}
          height={160}
          className="hidden sm:block"
          priority
        />
        <div className="text-3xl font-bold text-center mt-10 sm:text-xl">
          Something went wrong. The link is invalid.
        </div>
      </div>
    </div>
  );
};

export default reset;
