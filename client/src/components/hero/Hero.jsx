import React from "react";

const Hero = () => {
  return (
    <div className="flex flex-col justify-center items-center px-4">
      <div className="max-w-[600px]">
        <h1 className="text-3xl sm:text-5xl text-white text-gradient">
          Create your unique art. <br /> Make it your own t-shirt.
        </h1>
        <p className="text-left mt-5 text-white font-light text-lg">
          Make your ideas the art you always dreamed about with our AI tool. <br />
          Then, easily bring those designs to life through expert producers.
        </p>
        <button className="bg-[#2952e3] py-2 px-6 text-md rounded-full text-white cursor-pointer hover:bg-[#2546bd] mt-5">
          Login for free
        </button>
      </div>
    </div>
  );
};

export default Hero;
