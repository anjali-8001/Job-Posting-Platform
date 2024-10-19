import React, { useState } from "react";
import logo from "../../src/assets/Logo.png";
import { useDispatch, useSelector } from "react-redux";
import polygon from "../../src/assets/Polygon.png";
import { useNavigate } from "react-router-dom";
import { clearToken } from "../redux/Features/authSlice";
import { clearUser } from "../redux/Features/userSlice";

const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="flex w-full justify-between items-center px-14 py-5 h-[12vh]">
      <img src={logo} alt="logo" className="w-40 h-10" />
      <div className="flex items-center gap-5">
        <a href="" className="text-2xl font-medium text-[#576474]">
          Contact
        </a>
        {user?.name && (
          <div className="relative">
            <button
              className="flex gap-4 items-center justify-center border border-[#83909F] px-6 py-4 rounded-md"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <div className="w-8 h-8 rounded-full bg-[#A8A8A8]"></div>
              <p className="text-2xl font-medium text-[#576474]">
                {user?.name}
              </p>
              <img src={polygon} alt="dropdown" />
            </button>
            {showDropdown && (
              <button
                className="absolute flex gap-4 items-center justify-center border bg-[#83909F] px-6 py-4 rounded-md text-white w-full"
                onClick={() => {
                  localStorage.removeItem("auth");
                  dispatch(clearToken());
                  dispatch(clearUser());
                  navigate("/signup");
                }}
              >
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
