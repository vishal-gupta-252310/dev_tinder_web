import React, { useEffect, useState } from "react";

import { get } from "../Services/HttpService.js";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../Redux/reducers/feedReducer";
import Loading from "../Components/Loading";
import UserCard from "../Components/UserCard";
import { ArrayHaveValues } from "../Services/helper.js";
import { useNavigate } from "react-router-dom";

/**
 * Feed page component
 * @returns {JSX.Element}
 */
const Feed = () => {
  const [isLoading, setIsLoading] = useState(false);
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

  useEffect(() => {
    getFeedData();
  }, []);
  return (
    <>
      {isLoading && <Loading />}
      <div className="flex mt-40 overflow-auto">
        {!isLoading &&
          ArrayHaveValues &&
          feedData?.map((item) => <UserCard key={item._id} userData={item} />)}
      </div>
    </>
  );
};

export default Feed;
