import { useNavigate } from "react-router-dom";

const NoPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-5 bg-sky-500">
      <p className="text-xl font-medium text-black">
        This page Doesn&apos;t exist
      </p>
      <button
        onClick={() => navigate("/")}
        className="relative text-white bg-slate-800 hover:bg-green-600 fonr-medium transition-all delay-150 active:top-[-2px] px-3 py-2 rounded-md"
      >
        Home
      </button>
    </div>
  );
};

export default NoPage;