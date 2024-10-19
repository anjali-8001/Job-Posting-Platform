import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const token = localStorage.getItem("auth");
  const fetchJobPosts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/auth/get-jobs`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response?.data?.success) {
        setJobs(response?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchJobPosts();
    }
  }, [token]);

  return (
    <>
      <Navbar />
      <div className="flex border-t-2 border-[#C5C5C5]">
        <Sidebar />
        <div className="flex flex-col gap-10 px-10 py-20">
          <Link
            to="/create-interview"
            className="bg-[#0B66EF] w-full text-white text-2xl px-4 py-2 font-bold rounded-md cursor-pointer"
          >
            Create Interview
          </Link>
          <div className="flex flex-col gap-5">
            <h2 className="text-3xl font-bold">Job Posts</h2>
            <div className="flex gap-5">
              {jobs.length > 0 ? (
                jobs.map((job) => (
                  <div
                    key={job._id}
                    className="border rounded-lg p-4 shadow-md"
                  >
                    <h3 className="text-2xl font-semibold">{job.title}</h3>
                    <p className="text-gray-600">{job.description}</p>
                    <p className="text-sm text-gray-500">
                      Experience Level: {job.experienceLevel}
                    </p>
                    <p className="text-sm text-gray-500">
                      End Date: {new Date(job.endDate).toLocaleDateString()}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No job posts available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
