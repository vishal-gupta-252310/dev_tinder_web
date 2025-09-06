import React, { useEffect } from "react";
import UserList from "../Components/UserList";
import { useDispatch, useSelector } from "react-redux";
import { ArrayHaveValues } from "../Services/helper";
import { get, put } from "../Services/HttpService";
import { addRequests, removeRequest } from "../Redux/reducers/requestReducer";
import { useState } from "react";
import Loading from "../Components/Loading";
import ToastService from "../Services/ToastMessage";
import EmptyState from "../Components/EmptyState";

const Requests = () => {
  const requests = useSelector((store) => store.request) || [];
  const [isLoading, setIsLoading] = useState(false);
  const [isReviewing, setIsReviewing] = useState(false);

  const dispatch = useDispatch();

  const reviewRequest = async ({ requestId, status }) => {
    try {
      setIsReviewing(true);
      const { message = "" } = await put(`/requests/${requestId}/${status}`);
      ToastService.success(message);
      dispatch(removeRequest(requestId));
    } catch (error) {
      console.log(error);
      ToastService.error(error.message);
    } finally {
      setIsReviewing(false);
    }
  };

  const getRequests = async () => {
    if (ArrayHaveValues(requests)) return;

    try {
      setIsLoading(true);
      const { data = [] } = await get("/users/me/requests");
      dispatch(addRequests(data));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  return (
    <>
      <h1 className="my-4 text-center text-2xl font-bold">Requests</h1>
      {!isLoading && ArrayHaveValues(requests) && (
        <div className="flex flex-col gap-5 max-w-3xl mx-auto rounded-lg overflow-auto">
          {requests.map((request) => (
            <UserList
              key={request?._id}
              userData={request.fromUserId}
              isReviewing={isReviewing}
              isShowAcceptRejectButtons
              onAccept={() =>
                reviewRequest({ requestId: request._id, status: "accepted" })
              }
              onReject={() =>
                reviewRequest({ requestId: request._id, status: "rejected" })
              }
            />
          ))}
        </div>
      )}
      {isLoading && <Loading />}
      {!isLoading && !ArrayHaveValues(requests) && (
        <EmptyState title="No Requests Found" />
      )}
    </>
  );
};

export default Requests;
