import React from "react";

const UserCard = ({
  userData,
  isShowButtons = true,
  handleInterested = () => {},
  handleIgnore = () => {},
  isRequesting = false,
}) => {
  const { firstName, age, profilePhoto, about, gender, fullName } = userData;

  return (
    <>
      <div className="card bg-base-300 w-96 shadow-sm mx-3 my-3">
        <figure className="px-10 pt-10">
          <div className="avatar">
            <div className="w-40 rounded">
              <img src={profilePhoto} alt={`${firstName} profile photo`} />
            </div>
          </div>
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{fullName}</h2>
          {age && gender && (
            <p>
              {age} {gender}
            </p>
          )}
          <p>{about}</p>
          {isShowButtons && (
            <div className="card-actions">
              <button
                className="btn btn-secondary"
                disabled={isRequesting}
                onClick={handleInterested}
              >
                Interested
              </button>
              <button
                className="btn btn-primary"
                disabled={isRequesting}
                onClick={handleIgnore}
              >
                Ignore
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserCard;
