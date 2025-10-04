// packages
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

// icons
import {
  FaGoogle,
  FaGithub,
  FaFacebook,
  FaEyeSlash,
  FaEye,
} from "react-icons/fa";

// services
import { IsEqual, validateEmail, validPassword } from "../Services/helper.js";
import { post } from "../Services/HttpService.js";
import ToastService from "../Services/ToastMessage";

// redux
import { addUser } from "../Redux/reducers/userReducer";
import Input from "../Components/Input.jsx";
import PasswordInput from "../Components/PasswordInput.jsx";
import Button from "../Components/Button.jsx";
import Divider from "../Components/Divider.jsx";

/**
 * Login page component
 * @returns {JSX.Element}
 */
const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [isRequesting, setIsRequesting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /**
   * Validates the input fields
   * @param {string} name - The name of the field
   * @param {string} value - The value of the field
   * @returns {boolean} - Returns true if the field is valid, false otherwise
   */
  const validateFields = (name, value) => {
    if (!value) {
      setErrors({
        ...errors,
        [name]: `${name} is required.`,
      });
      return false;
    }

    if (IsEqual(name, "email") && !validateEmail(value)) {
      setErrors({
        ...errors,
        email: "Please enter a valid email address.",
      });
      return false;
    }

    if (IsEqual(name, "password") && !validPassword(value)) {
      setErrors({
        ...errors,
        password:
          "Password must contain at least 8 chars, one uppercase, one lowercase, one number, and one special char.",
      });
      return false;
    }
    return true;
  };

  /**
   * Handles the change event of the input fields
   * @param {string} name - The name of the field
   * @param {string} value - The value of the field
   */
  const handleChange = (name, value) => {
    setForm({
      ...form,
      [name]: value ?? "",
    });

    if (validateFields(name, value)) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  /**
   * Handles the login process
   */
  const handleLogin = async (event) => {
    event.preventDefault();
    if (isRequesting) return;
    if (!validateFields("email", form.email)) return;
    if (!validateFields("password", form.password)) return;

    setIsRequesting(true);
    try {
      const { message = "", data = {} } = await post("auth/login", form);
      ToastService.success(message);
      dispatch(addUser(data));
      return navigate("/");
    } catch ({
      response: { data: { message = "Internal server error" } = {} } = {},
    }) {
      ToastService.error(message);
    } finally {
      setIsRequesting(false);
    }
  };
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center py-2">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold text-center mb-6 flex justify-center">
            Welcome Back
          </h2>
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <form onSubmit={(e) => handleLogin(e)}>
              {/* Email Input */}
              <Input
                value={form.email}
                errors={errors}
                handleChange={handleChange}
                label="Email"
                name="email"
                type="email"
                placeholder="Enter your email"
                required
                disabled={isRequesting}
              />

              <PasswordInput
                className="mt-4"
                label="Password"
                forgetPasswordLink="/forgot-password"
                forgetPasswordLabel="Forgot Password?"
                name="password"
                errors={errors}
                isRequesting={isRequesting}
                handleChange={handleChange}
              />

              {/* Remember Me & Login Button */}
              <Button
                isRequesting={isRequesting}
                type="submit"
                className="mt-6"
                label={isRequesting ? "Logging in..." : "Login"}
              />
            </form>
          </fieldset>

          {/* Divider */}
          <Divider label="OR CONTINUE WITH" className="mt-6" />
          {/* Social Login Buttons */}
          <div className="flex justify-center gap-4">
            <button className="btn btn-outline btn-circle">
              <FaGoogle className="text-xl" />
            </button>
            <button className="btn btn-outline btn-circle">
              <FaGithub className="text-xl" />
            </button>
            <button className="btn btn-outline btn-circle">
              <FaFacebook className="text-xl" />
            </button>
          </div>
          {/* Sign Up Link */}
          <div className="text-center mt-6">
            <span className="text-sm">Don't have an account? </span>
            <Link
              to="/signup"
              className="link link-primary text-sm font-medium"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
