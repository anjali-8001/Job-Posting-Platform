import axios from "axios";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/Features/userSlice";

export function ProtectedRoute() {
  const [ok, setOK] = useState(false);
  const token = localStorage.getItem("auth");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authUserCheck = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API}/auth/auth-user`, {
      headers: {
        Authorization: token,
      },
    });
    if (res?.data?.success) {
      dispatch(setUser(res?.data?.data));
      setOK(true);
    } else {
      setOK(false);
    }
  };

  useEffect(() => {
    if (token) authUserCheck();
    else {
      navigate("/login");
    }
  }, [token]);

  if (!ok) return null;

  return <Outlet />;
}
