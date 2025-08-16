import React from 'react'

const UserList = ({ userData, isShowAcceptRejectButtons = false, onAccept, onReject, isReviewing }) => {
const { profilePhoto, firstName, lastName, age, gender, about } = userData;

  return (
   <>
    <div className="flex bg-base-300 align-center gap-10 p-5">
        <div className="flex justify-start">
            <img src={profilePhoto} alt={`${firstName} ${lastName}`} className="rounded-full w-24 h-24" />
        </div>
        <div className="flex flex-col gap-2">
            <p className='font-bold text-xl'>{`${firstName} ${lastName}`}</p>
            {age && gender && <p className='font-semibold'>{age} {gender}</p>}
            <p className='font-semibold'>{about}</p>
            {isShowAcceptRejectButtons && (
                <div className="flex gap-5">
                    <button className="btn btn-primary"s onClick={onAccept} disabled={isReviewing}>Accept</button>
                    <button className="btn btn-secondary" onClick={onReject} disabled={isReviewing}>Reject</button>
                </div>
            )}
        </div>
    </div>
   </>
  )
}

export default UserList