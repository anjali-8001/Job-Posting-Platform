import React from "react";
import home from "../../src/assets/home.png";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="flex flex-col gap-5 items-center w-32 h-[88vh] border-r-2 border-[#C5C5C5] py-20">
      <Link to="/" className="cursor-pointer flex justify-center items-center">
        <img src={home} alt="home" />
      </Link>
    </div>
  );
};

export default Sidebar;
