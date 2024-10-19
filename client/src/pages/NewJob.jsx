import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useSelector } from "react-redux";

const NewJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [candidateEmail, setCandidateEmail] = useState("");
  const [endDate, setEndDate] = useState("");
  const token = localStorage.getItem("auth");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!candidates || candidates?.length === 0) {
      return toast.error("Please add candidate emails");
    }
    const data = {
      title,
      description,
      experienceLevel,
      candidates,
      endDate,
    };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/auth/create-job-post`,
        {
          title,
          description,
          experienceLevel,
          candidates,
          endDate,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response?.data?.success) {
        toast.success(response?.data?.message);
        navigate("/");
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      //   console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  const handleAddCandidate = (e) => {
    e.preventDefault();
    if (candidateEmail && !candidates.includes(candidateEmail)) {
      setCandidates([...candidates, candidateEmail]);
      setCandidateEmail(""); // Clear the input after adding
    }
  };

  const handleRemoveCandidate = (emailToRemove) => {
    setCandidates(candidates.filter((email) => email !== emailToRemove));
  };

  const validateEmail = (email) => {
    // Simple regex for email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return (
    <>
      <Navbar />
      <div className="flex border-t-2 border-[#C5C5C5]">
        <Sidebar />
        <div className="px-10 py-20 w-full">
          <form
            onSubmit={handleSubmit}
            className="flex items-center justify-center flex-col gap-5 "
          >
            <div className="flex items-center justify-start gap-10 w-full">
              <label htmlFor="title" className="text-3xl w-[300px] text-right">
                Job Title
              </label>
              <input
                type="text"
                name="title"
                className="text-2xl font-normal outline-none  rounded-lg  border border-[#CCCCCC] py-3 px-4 w-[500px]"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="flex gap-10 w-full">
              <label htmlFor="title" className="text-3xl  w-[300px] text-right">
                Job Description
              </label>
              <textarea
                rows={6}
                type="text"
                name="title"
                className="text-2xl font-normal outline-none  rounded-lg  border border-[#CCCCCC] py-3 px-4 w-[500px]"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-10 w-full">
              <label htmlFor="title" className="text-3xl  w-[300px] text-right">
                Experience Level
              </label>
              <select
                id="experience"
                name="experience"
                className="text-2xl font-normal outline-none  rounded-lg  border border-[#CCCCCC] py-3 px-4 w-[500px]"
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
              >
                <option value="" disabled>
                  Select Experience Level
                </option>
                <option value="0-1">0-1 years (Entry Level)</option>
                <option value="1-3">1-3 years (Junior)</option>
                <option value="3-5">3-5 years (Mid Level)</option>
                <option value="5-10">5-10 years (Senior)</option>
                <option value="10+">10+ years (Expert)</option>
              </select>
            </div>{" "}
            <div className="flex items-start gap-10 w-full">
              <label
                htmlFor="candidates"
                className="text-3xl w-[300px] text-right"
              >
                Add Candidate
              </label>
              <div className="flex flex-col w-[500px]">
                <input
                  type="email"
                  name="candidates"
                  className="text-2xl font-normal outline-none rounded-lg border border-[#CCCCCC] py-3 px-4 mb-2"
                  value={candidateEmail}
                  onChange={(e) => setCandidateEmail(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      if (candidateEmail && validateEmail(candidateEmail)) {
                        handleAddCandidate(e);
                      }
                    }
                  }}
                  placeholder="Enter candidate email"
                />
                <div className="flex flex-wrap gap-2">
                  {candidates.map((email, index) => (
                    <span
                      key={index}
                      className="flex items-center bg-gray-200 text-gray-800 py-1 px-2 rounded-full"
                    >
                      {email}
                      <button
                        type="button"
                        className="ml-2 text-red-500"
                        onClick={() => handleRemoveCandidate(email)}
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-10 w-full">
              <label htmlFor="title" className="text-3xl  w-[300px] text-right">
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                className="text-2xl font-normal outline-none  rounded-lg  border border-[#CCCCCC] py-3 px-4 w-[500px]"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div className="flex justify-end items-end w-[400px]">
              <button
                type="submit"
                className="bg-[#0B66EF] text-white text-2xl px-10 py-2 font-bold rounded-md "
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewJob;
