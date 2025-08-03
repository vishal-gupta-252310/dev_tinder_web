import React from "react";

const UserCard = ({ userData }) => {
  const { firstName, age, profilePhoto, about, gender, fullName } = userData;

  return (
    <>
      <div className="card bg-base-300 w-96 shadow-sm mx-3 my-3">
        <figure className="px-10 pt-10">
          <img
            src={profilePhoto}
            alt={`${firstName} profile photo`}
            className="rounded-xl"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{fullName}</h2>
          {age && gender && (
            <p>
              {age} {gender}
            </p>
          )}
          <p>{about}</p>
          <div className="card-actions">
            <button className="btn btn-secondary">Interested</button>
            <button className="btn btn-primary">Ignore</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCard;
