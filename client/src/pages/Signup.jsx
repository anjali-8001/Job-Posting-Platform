import React, { useState } from "react";
import Navbar from "../components/Navbar";
import user from "../../src/assets/name.png";
import mail from "../../src/assets/mail.png"; 
import vector from "../../src/assets/Vector.png";
import groups from "../../src/assets/groups.png";
import { PiPasswordThin } from "react-icons/pi";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Signup = () => {
  const [name, setName] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [employeeSize, setEmployeeSize] = useState();
  const [mobile, setMobile] = useState();
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/auth/company-register`,
        {
          name,
          mobile,
          companyEmail,
          companyName,
          employeeSize,
          password,
        }
      );

      if (response?.data?.success) {
        sessionStorage.setItem("companyEmail", response?.data?.data);
        toast.success(response?.data?.message);
        navigate("/verification");
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
      <div className="flex items-center justify-center w-full px-36 py-15 gap-20 h-full">
        <p className="text-xl text-[#292929B2] w-1/2">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley
        </p>
        <form
          onSubmit={handleSignUp}
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
              <img src={user} alt="name" className="w-5 h-auto" />
              <input
                type="text"
                name="name"
                className="text-2xl font-normal outline-none bg-[#F4F4F4] w-full"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="flex gap-4 border border-[#CCCCCC] py-3 px-4 items-center rounded-lg bg-[#F4F4F4]">
              <img src={vector} alt="mobile" className="w-5 h-auto" />
              <input
                type="tel"
                name="mobile"
                className="text-2xl font-normal outline-none bg-[#F4F4F4] w-full"
                placeholder="Phone"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
              />
            </div>
            <div className="flex gap-4 border border-[#CCCCCC] py-3 px-4 items-center rounded-lg bg-[#F4F4F4]">
              <img src={user} alt="name" className="w-5 h-auto" />
              <input
                type="text"
                name="companyName"
                className="text-2xl font-normal outline-none bg-[#F4F4F4] w-full"
                placeholder="Company Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
            </div>
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
              <img src={groups} alt="size" className="w-8 h-auto" />
              <input
                type="number"
                name="employyeSize"
                className="text-2xl font-normal outline-none bg-[#F4F4F4] w-full"
                placeholder="Employee Size"
                value={employeeSize}
                onChange={(e) => setEmployeeSize(e.target.value)}
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
              By clicking on proceed you wil accept our{" "}
              <a className="text-[#0B66EFB2]">Terms & Conditions</a>
            </p>
            <p className="text-center px-20">
              Already a user?{" "}
              <Link to="/login" className="text-[#0B66EFB2]">
                Login
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

export default Signup;
