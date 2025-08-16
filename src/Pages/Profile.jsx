import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ToastService from "../Services/ToastMessage";
import { patch } from "../Services/HttpService.js";
import { addUser } from "../Redux/reducers/userReducer.js";
import { validateUrl } from "../Services/helper.js";
import UserCard from "../Components/UserCard.jsx";

const Profile = () => {
  const userData = useSelector((state) => state.user.user);
  const [form, setForm] = useState({
    firstName: userData?.firstName ?? "",
    lastName: userData?.lastName ?? "",
    age: userData?.age ?? "",
    gender: userData?.gender ?? "",
    about: userData?.about ?? "",
    profilePhoto: userData?.profilePhoto ?? "",
    skills: userData?.skills ?? [],
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    about: "",
    profilePhoto: "",
    skills: "",
    serverError: [],
  });
  const [isRequesting, setIsRequesting] = useState(false);
  const dispatch = useDispatch();

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

    if (name === "profilePhoto" && !validateUrl(value)) {
      setErrors({
        ...errors,
        profilePhoto: "Please enter a valid url.",
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
  const saveProfile = async () => {
    if (isRequesting) return;
    
    if (!validateFields("firstName", form.firstName)) return;
    if (!validateFields("lastName", form.lastName)) return;
    if (!validateFields("age", form.age)) return;
    if (!validateFields("gender", form.gender)) return;
    if (!validateFields("about", form.about)) return;
    if (!validateFields("skills", form.skills)) return;
    if (!validateFields("profilePhoto", form.profilePhoto)) return;

    try {
      setIsRequesting(true);
      const { message = "", data = {} } = await patch("profile", form);
      ToastService.success(message);
      setErrors({
        ...errors,
        serverError: [],
      });
      dispatch(addUser(data));
    } catch ({
      response: { data: { message = "Internal server error", validations = [] } = {} } = {},
    }) {
      ToastService.error(message);
      setErrors({
        ...errors,
        serverError: validations,
      });
    } finally {
      setIsRequesting(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
    <div className="min-h-screen flex items-center justify-center py-2">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold text-center mb-6 flex justify-center">
            Profile
          </h2>

          {/* Email Input */}
          <div className="form-control">
            <input
              type="email"
              className="input input-bordered w-full"
              value={userData?.email}
              disabled
              readOnly
              required
              name="email"
            />
          </div>

          {/* Password Input */}
          <div className="form-control">
            <label className="label mb-2">
              <span className="label-text">First Name</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={form.firstName}
              disabled={isRequesting}
              required
              name="firstName"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
            {errors.firstName && (
              <p className="text-red-500 mt-3">{errors.firstName}</p>
            )}
          </div>

          {/* Last Name Input */}
          <div className="form-control">
            <label className="label mb-2">
              <span className="label-text">Last Name</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={form.lastName}
              disabled={isRequesting}
              required
              name="lastName"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
            {errors.lastName && (
              <p className="text-red-500 mt-3">{errors.lastName}</p>
            )}
          </div>

          {/* Age Input */}
          <div className="form-control">
            <label className="label mb-2">
              <span className="label-text">Age</span>
            </label>
            <input
              className="input input-bordered w-full"
              type="number"
              value={form.age}
              disabled={isRequesting}
              required
              name="age"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
            {errors.age && (
              <p className="text-red-500 mt-3">{errors.age}</p>
            )}
          </div>

          {/* profile photo */}
          <div className="form-control">
            <label className="label mb-2">
              <span className="label-text">Profile Photo</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={form.profilePhoto}
              disabled={isRequesting}
              required
              name="profilePhoto"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
            {errors.profilePhoto && (
              <p className="text-red-500 mt-3">{errors.profilePhoto}</p>
            )}
          </div>

          {/* Gender Input */}
          <div className="form-control">
            <select defaultValue="Pick a gender" className="select" value={form.gender} onChange={(e) => handleChange("gender", e.target.value)}>
              <option disabled={true}>Pick a gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 mt-3">{errors.gender}</p>
            )}
          </div>

          {/* About Input */}
          <div className="form-control">
            <textarea
              className="textarea"
              placeholder="Bio"
              value={form.about}
              disabled={isRequesting}
              required
              name="about"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            ></textarea>
            {errors.about && (
              <p className="text-red-500 mt-3">{errors.about}</p>
            )}
          </div>

          {/* Remember Me & Login Button */}
          <button
            className="btn btn-primary mt-4"
            onClick={saveProfile}
            disabled={isRequesting}
          >
            Save Profile
          </button>

          {errors.serverError.length > 0 && (
              <p className="text-red-500 mt-3">{errors.serverError.join("\n")}</p>
            )}
        </div>
      </div>
    </div>
    <UserCard userData={{
      firstName: form.firstName,
      lastName: form.lastName,
      age: form.age,
      gender: form.gender,
      about: form.about,
      profilePhoto: form.profilePhoto,
      fullName: form.firstName + " " + form.lastName,
    }} />
    </div>
  );
};

export default Profile;
