import React, { useState } from "react";
import Navbar from "../components/Navbar";
import mail from "../../src/assets/mail.png";
import { PiPasswordThin } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const [companyEmail, setCompanyEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/auth/login`,
        {
          companyEmail,
          password,
        }
      );

      if (response?.data?.success) {
        toast.success(response?.data?.message);
        localStorage.setItem("auth", response?.data?.token);
        navigate("/");
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      //   console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center w-full px-36 py-15 gap-20 h-[80vh]">
        <p className="text-xl text-[#292929B2] w-1/2">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley
        </p>
        <form
          onSubmit={handleLogin}
          className="w-1/2 p-8 flex flex-col gap-10"
          style={{
            border: "1px solid transparent",
            borderImage: "linear-gradient(90deg, #3F71FF, #AA54FF) 1",
            borderImageSlice: 1,
            borderRadius: "15px", // Add rounded corners
          }}
        >
          <div className="flex flex-col justify-center items-center w-full">
            <h2 className="text-3xl font-semibold">Login</h2>
            <p className="font-medium">Lorem Ipsum is simply dummy text</p>
          </div>
          <div className="flex flex-col gap-5 w-full">
            <div className="flex gap-4 border border-[#CCCCCC] py-3 px-4 items-center rounded-lg bg-[#F4F4F4]">
              <img src={mail} alt="mail" className="w-5 h-auto" />
              <input
                type="email"
                name="email"
                className="text-2xl font-normal outline-none bg-[#F4F4F4] w-full"
                placeholder="Company Email"
                value={companyEmail}
                onChange={(e) => setCompanyEmail(e.target.value)}
                required
              />
            </div>

            <div className="flex gap-4 border border-[#CCCCCC] py-3 px-4 items-center rounded-lg bg-[#F4F4F4]">
              <PiPasswordThin className="w-8 h-auto" />
              <input
                type="password"
                name="password"
                className="text-2xl font-normal outline-none bg-[#F4F4F4] w-full"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <p className="text-center px-20">
              New user?{" "}
              <Link to="/signup" className="text-[#0B66EFB2]">
                SignUp
              </Link>
            </p>
            <button
              type="submit"
              className="bg-[#0B66EF] w-full text-white text-2xl py-2 font-bold rounded-md"
            >
              Proceed
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
