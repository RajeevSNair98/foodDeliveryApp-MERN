import React, { useState, useEffect } from "react";
import { useAuth } from "../../../context/auth";
import  {Outlet}  from "react-router-dom";
import axios from "axios";
import  Spinner  from "../Spinner";

export const AdminRoute = () => {
  const [ok, setOk] = useState(false);
  const {auth,setAuth} = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/admin_auth`);
        if (response.data.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ?  <Outlet />:<Spinner/>  
};