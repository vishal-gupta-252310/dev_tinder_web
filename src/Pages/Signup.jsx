import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import ToastService from "../Services/ToastMessage";
import { postWithFile } from "../Services/HttpService";
import { IsEqual, validateEmail, validPassword } from "../Services/helper.js";
import { addUser } from "../Redux/reducers/userReducer";

const Signup = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    userName: "",
    age: "",
    gender: "",
    about: "",
    skills: [],
    profilePhoto: "",
  });

  const [errors, setErrors] = useState({});
  const [isRequesting, setIsRequesting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateFields = (name, value) => {
    let error = "";
    if (!value || (Array.isArray(value) && value.length === 0))
      error = `${name} is required.`;

    if (IsEqual(name, "email") && !validateEmail(value))
      error = "Please enter a valid email address.";

    if (IsEqual(name, "password") && !validPassword(value))
      error =
        "Password must contain at least 8 chars, one uppercase, one lowercase, one number, and one special char.";

    if (IsEqual(name, "skills") && value.length > 10)
      error = "You can add up to 10 skills only.";

    setErrors((prev) => ({ ...prev, [name]: error }));
    return !error;
  };

  const handleChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) validateFields(name, value);
  };

  const handleSignup = async () => {
    if (isRequesting) return;

    try {
      // Validate all fields
      const isValid = Object.keys(form).every((key) =>
        validateFields(key, form[key])
      );

      if (!isValid) return;

      const formData = new FormData();
      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      setIsRequesting(true);
      const { message = "", data = {} } = await postWithFile(
        "auth/signup",
        formData
      );
      ToastService.success(message);
      dispatch(addUser(data));
      navigate("/");
    } catch ({
      response: { data: { message = "Internal server error" } = {} } = {},
    }) {
      ToastService.error(message);
    } finally {
      setIsRequesting(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          profilePhoto: "File size should be less than 2MB.",
        }));
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange("profilePhoto", file);
        setErrors((prev) => ({ ...prev, profilePhoto: "" }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-base-200 flex items-center justify-center py-6">
        <div className="card w-full max-w-4xl bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl font-bold text-center mb-6">
              Create Your Account
            </h2>

            <div className="flex flex-col md:flex-row gap-6">
              {/* Left Column */}
              <div className="flex-1 flex flex-col gap-4">
                {/* First & Last Name */}
                <div className="flex gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    className="input input-bordered w-full"
                    value={form.firstName}
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                    disabled={isRequesting}
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    className="input input-bordered w-full"
                    value={form.lastName}
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                    disabled={isRequesting}
                  />
                </div>
                {(errors.firstName || errors.lastName) && (
                  <p className="text-red-500 text-sm">
                    {errors.firstName || errors.lastName}
                  </p>
                )}

                {/* Username */}
                <div className="flex flex-col">
                  <input
                    type="text"
                    name="userName"
                    placeholder="Username"
                    className="input input-bordered w-full"
                    value={form.userName}
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                    disabled={isRequesting}
                  />
                  {errors.userName && (
                    <p className="text-red-500 text-sm">{errors.userName}</p>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="input input-bordered w-full"
                    value={form.email}
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                    disabled={isRequesting}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>

                {/* Password */}
                <div className="flex flex-col relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    className="input input-bordered w-full pr-12"
                    value={form.password}
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                    disabled={isRequesting}
                  />
                  <span
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                  {errors.password && (
                    <p className="text-red-500 text-sm">{errors.password}</p>
                  )}
                </div>

                {/* Skills */}
                <div className="flex flex-col">
                  <label className="label">
                    <span className="label-text">Skills (max 10)</span>
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {form.skills.map((skill, idx) => (
                      <div
                        key={idx}
                        className="badge badge-primary gap-2 cursor-pointer"
                        onClick={() =>
                          handleChange(
                            "skills",
                            form.skills.filter((s) => s !== skill)
                          )
                        }
                      >
                        {skill} ✕
                      </div>
                    ))}
                  </div>
                  <input
                    type="text"
                    placeholder="Type a skill and press Enter"
                    className="input input-bordered w-full"
                    disabled={isRequesting || form.skills.length >= 10}
                    onKeyDown={(e) => {
                      if (
                        e.key === "Enter" &&
                        e.target.value.trim() &&
                        !form.skills.includes(e.target.value.trim())
                      ) {
                        handleChange("skills", [
                          ...form.skills,
                          e.target.value.trim(),
                        ]);
                        e.target.value = "";
                        e.preventDefault();
                      }
                    }}
                  />
                  {errors.skills && (
                    <p className="text-red-500 text-sm mt-1">{errors.skills}</p>
                  )}
                </div>
              </div>

              {/* Right Column */}
              <div className="flex-1 flex flex-col gap-4">
                {/* Age */}
                <div className="flex flex-col">
                  <input
                    type="number"
                    name="age"
                    placeholder="Age"
                    className="input input-bordered w-full"
                    value={form.age}
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                    disabled={isRequesting}
                    min={18}
                    max={60}
                    step={1}
                  />
                  {errors.age && (
                    <p className="text-red-500 text-sm">{errors.age}</p>
                  )}
                </div>

                {/* Gender */}
                <div className="flex flex-col">
                  <select
                    name="gender"
                    className="select select-bordered w-full"
                    value={form.gender}
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                    disabled={isRequesting}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.gender && (
                    <p className="text-red-500 text-sm">{errors.gender}</p>
                  )}
                </div>

                {/* About */}
                <div className="flex flex-col">
                  <textarea
                    name="about"
                    placeholder="About yourself"
                    className="textarea textarea-bordered w-full"
                    value={form.about}
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                    disabled={isRequesting}
                  />
                  {errors.about && (
                    <p className="text-red-500 text-sm">{errors.about}</p>
                  )}
                </div>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Pick a file</legend>
                  <input
                    type="file"
                    className="file-input"
                    name="profilePhoto"
                    accept="image/*"
                    disabled={isRequesting}
                    onChange={handleFileChange}
                  />
                  <label className="label">Max size 2MB</label>
                </fieldset>
              </div>
            </div>

            {/* Signup Button */}
            <button
              className="btn btn-primary mt-4 w-full"
              onClick={handleSignup}
              disabled={isRequesting}
            >
              Sign Up
            </button>

            <p className="text-center text-sm mt-2">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary font-medium">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
