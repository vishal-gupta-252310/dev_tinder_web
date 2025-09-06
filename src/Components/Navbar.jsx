// packages
import React from "react";
import { useDispatch, useSelector } from "react-redux";

// services
import { IsObjectHaveValue } from "../Services/helper.js";
import { post } from "../Services/HttpService.js";
import ToastService from "../Services/ToastMessage";
import { removeUser } from "../Redux/reducers/userReducer";
import { Link, useNavigate } from "react-router-dom";

/**
 * Navbar component
 * @returns {JSX.Element}
 */
const Navbar = () => {
  const user = useSelector((store) => store?.user?.user || {});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /**
   * Handles the logout process
   */
  const handleLogout = async () => {
    try {
      const { message } = await post("auth/logout");
      ToastService.success(message);
      dispatch(removeUser());
      navigate("/login");
    } catch (error) {
      ToastService.error(
        error?.response?.data?.message || "Internal server error"
      );
    }
  };

  return (
    <>
      <div className="navbar bg-base-300 shadow-sm">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            DevTinder
          </Link>
        </div>
        {IsObjectHaveValue(user) && (
          <div className="flex gap-2 items-center">
            <p>Welcome, {user.firstName}</p>
            <div className="dropdown dropdown-end mx-5">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt={`${user.firstName} profile photo`}
                    src={user?.profilePhoto}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <Link to="/connections">Connections</Link>
                </li>
                <li>
                  <Link to="/requests">Requests</Link>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
