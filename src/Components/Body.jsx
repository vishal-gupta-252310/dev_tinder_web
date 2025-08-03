// packages
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// components
import Navbar from "./Navbar";
import Footer from "./Footer";

// services
import { get } from "../Services/HttpService";
import { addUser } from "../Redux/reducers/userReducer";
import { IsObjectHaveValue } from "../Services/helper";
import Loading from "./Loading";

/**
 * Body component
 * @returns {JSX.Element}
 */
const Body = () => {
  const user = useSelector((store) => store.user.user);
  const [isRequesting, setIsRequesting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getUser = async () => {
    if (IsObjectHaveValue(user)) return;

    try {
      setIsRequesting(true);
      const { data = {} } = await get("/profile");
      dispatch(addUser(data));
      return navigate("/");
    } catch ({
      response: {
        data: { message = "Internal server error", status } = {},
      } = {},
    }) {
      console.error("failed: ", message);
      if (status == 401) {
        navigate("/login");
      }
    } finally {
      setIsRequesting(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      {isRequesting && <Loading />}
      {!isRequesting && (
        <div>
          <Navbar />
          <Outlet />
          <Footer />
        </div>
      )}
    </>
  );
};

export default Body;
