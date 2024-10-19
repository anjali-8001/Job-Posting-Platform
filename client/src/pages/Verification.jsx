import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import mail from "../../src/assets/mail.png";
import vector from "../../src/assets/Vector.png";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../redux/Features/authSlice";
import { setUser } from "../redux/Features/userSlice";
import check from "../assets/check_circle.png";

const Verification = () => {
  const [companyEmail, setCompanyEmail] = useState();
  const { user } = useSelector((state) => state?.user);

  const [emailOtp, setEmailOtp] = useState("");
  const [mobileOtp, setMobileOtp] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSendVerificationEmail = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/auth/verify-email`,
        {
          companyEmail: user?.companyEmail,
          otp: emailOtp,
        }
      );

      if (response?.data?.success) {
        toast.success(response?.data?.message);
        dispatch(setUser(response?.data?.data));

        if (response?.data?.token) {
          localStorage.setItem("auth", response?.data?.token);
          navigate("/");
        }
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      //   console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  const handleVerifyMobile = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/auth/verify-mobile`,
        {
          companyEmail: user?.companyEmail,
          otp: mobileOtp,
        }
      );

      if (response?.data?.success) {
        toast.success(response?.data?.message);
        dispatch(setUser(response?.data?.data));

        if (response?.data?.token) {
          localStorage.setItem("auth", response?.data?.token);
          navigate("/");
        }
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
      <div className="flex items-center justify-center w-full px-36 py-15 gap-20 h-[85vh]">
        <p className="text-xl text-[#292929B2] w-1/2">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley
        </p>
        <div
          className="w-1/2 p-8 flex flex-col gap-10"
          style={{
            border: "1px solid transparent",
            borderImage: "linear-gradient(90deg, #3F71FF, #AA54FF) 1",
            borderImageSlice: 1,
            borderRadius: "15px", // Add rounded corners
          }}
        >
          <div className="flex flex-col justify-center items-center w-full">
            <h2 className="text-3xl font-semibold">Sign Up</h2>
            <p className="font-medium">Lorem Ipsum is simply dummy text</p>
          </div>
          <div className="flex flex-col gap-5 w-full">
            <div className="flex gap-4 border border-[#CCCCCC] py-3 px-4 items-center rounded-lg bg-[#F4F4F4]">
              <img src={mail} alt="mail" className="w-5 h-auto" />
              <input
                type="email"
                className="text-2xl font-normal outline-none bg-[#F4F4F4] w-full"
                placeholder="Email OTP"
                value={emailOtp}
                onChange={(e) => setEmailOtp(e.target.value)}
                disabled={user?.isEmailVerified}
                required
              />
              {user?.isEmailVerified && <img src={check} alt="check" />}
            </div>
            {!user?.isEmailVerified && (
              <button
                className="bg-[#0B66EF] w-full text-white text-2xl py-2 font-bold rounded-md"
                onClick={handleSendVerificationEmail}
              >
                Verify
              </button>
            )}
            <div className="flex gap-4 border border-[#CCCCCC] py-3 px-4 items-center rounded-lg bg-[#F4F4F4]">
              <img src={mail} alt="mail" className="w-5 h-auto" />
              <input
                type="email"
                className="text-2xl font-normal outline-none bg-[#F4F4F4] w-full"
                placeholder="Mobile OTP"
                value={mobileOtp}
                onChange={(e) => setMobileOtp(e.target.value)}
                disabled={user?.isMobileVerified}
                required
              />
              {user?.isMobileVerified && <img src={check} alt="check" />}
            </div>
            {!user?.isMobileVerified && (
              <button
                className="bg-[#0B66EF] w-full text-white text-2xl py-2 font-bold rounded-md"
                onClick={handleVerifyMobile}
              >
                Verify
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Verification;
