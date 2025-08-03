// packages
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// icons
import {
  FaGoogle,
  FaGithub,
  FaFacebook,
  FaEyeSlash,
  FaEye,
} from "react-icons/fa";

// services
import { IsEqual, validateEmail, validPassword } from "../Services/helper";
import { post } from "../Services/HttpService";
import ToastService from "../Services/ToastMessage";

// redux
import { addUser } from "../Redux/reducers/userReducer";

/**
 * Login page component
 * @returns {JSX.Element}
 */
const Login = () => {
  const [form, setForm] = useState({
    email: "vishalgupta@gmail.com",
    password: "Vishal@1234",
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
  const handleLogin = async () => {
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

          {/* Email Input */}
          <div className="form-control">
            <label className="label mb-2">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
              value={form.email}
              disabled={isRequesting}
              required
              name="email"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
            {errors.email && (
              <p className="text-red-500 mt-3">{errors.email}</p>
            )}
          </div>

          {/* Password Input */}
          <div className="form-control mt-4">
            <div className="flex justify-between items-center mb-2">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <a href="#" className="label-text-alt link link-hover text-sm">
                Forgot password?
              </a>
            </div>
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                disabled={isRequesting}
                className="input input-bordered w-full pr-12"
                value={form.password}
                required
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              />
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </span>
            </div>
            {errors.password && (
              <p className="text-red-500 mt-3">{errors.password}</p>
            )}
          </div>

          {/* Remember Me & Login Button */}
          <button
            className="btn btn-primary mt-4"
            onClick={handleLogin}
            disabled={isRequesting}
          >
            Sign In
          </button>

          {/* Divider */}
          <div className="divider my-6">OR CONTINUE WITH</div>

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
            <a href="#" className="link link-primary text-sm font-medium">
              Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
