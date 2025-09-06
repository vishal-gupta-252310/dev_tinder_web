import React, { useEffect, useState } from "react";

import { get, post } from "../Services/HttpService.js";
import { useDispatch, useSelector } from "react-redux";
import { addFeed, removeSingleFeed } from "../Redux/reducers/feedReducer";
import Loading from "../Components/Loading";
import UserCard from "../Components/UserCard";
import { ArrayHaveValues } from "../Services/helper.js";
import { useNavigate } from "react-router-dom";
import ToastService from "../Services/ToastMessage.jsx";
import EmptyState from "../Components/EmptyState.jsx";

/**
 * Feed page component
 * @returns {JSX.Element}
 */
const Feed = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);
  const feedData = useSelector((state) => state.feed);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getFeedData = async () => {
    try {
      setIsLoading(true);
      const { data = [] } = await get("/users/me/feed");
      dispatch(addFeed(data));
    } catch (error) {
      console.log(error);
      navigate("/login");
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnectionStatus = async ({ status, toUserId }) => {
    try {
      setIsRequesting(true);
      const { message } = await post(`/requests/${toUserId}/${status}`);

      dispatch(removeSingleFeed(toUserId));
      ToastService.success(message);
    } catch (error) {
      console.log(error);
      ToastService.error(error.message);
    } finally {
      setIsRequesting(false);
    }
  };

  useEffect(() => {
    getFeedData();
  }, []);
  return (
    <>
      {isLoading && <Loading />}
      <div className="flex mt-40 overflow-auto">
        {!isLoading &&
          ArrayHaveValues &&
          feedData?.map((item) => (
            <UserCard
              key={item._id}
              userData={item}
              handleInterested={() =>
                handleConnectionStatus({
                  status: "interested",
                  toUserId: item._id,
                })
              }
              handleIgnore={() =>
                handleConnectionStatus({
                  status: "ignored",
                  toUserId: item._id,
                })
              }
              isRequesting={isRequesting}
            />
          ))}
      </div>
      {!isLoading && !ArrayHaveValues(feedData) && (
        <EmptyState
          title="No Feed Found"
          message="Looks like you don’t have any new feed yet."
          actionLabel="Refresh"
          onAction={getFeedData}
        />
      )}
    </>
  );
};

export default Feed;
