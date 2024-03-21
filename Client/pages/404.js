import Link from "next/link";

const custom404 = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen bg-[#15202b]">
      <div className="py-16 px-6 lg:py-8 lg:px-4">
        <div className="text-center">
          <h1 className="mb-4 tracking-tight font-extrabold text-9xl lg:text-7xl text-[#3b82f6]">
            404
          </h1>
          <p className="mb-4 tracking-tight font-bold text-4xl md:text-3xl text-white">
            Something's missing.
          </p>
          <p className="mb-4 text-lg font-light text-gray-400">
            Sorry, we can't find that page. You'll find lots to explore on the
            home page.{" "}
          </p>
          <Link
            href="/"
            className="inline-flex text-white bg-[#2563eb] hover:bg-[#1e40af] focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-[#1e3a8a] my-4"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default custom404;
