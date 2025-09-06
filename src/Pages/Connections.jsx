import React, { useEffect } from "react";
import UserList from "../Components/UserList";
import { useDispatch, useSelector } from "react-redux";
import { ArrayHaveValues } from "../Services/helper";
import { del, get } from "../Services/HttpService";
import {
  addConnections,
  removeConnection,
} from "../Redux/reducers/connectionReducer";
import { useState } from "react";
import Loading from "../Components/Loading";
import EmptyState from "../Components/EmptyState";
import ToastService from "../Services/ToastMessage";

const Connections = () => {
  const connections = useSelector((store) => store.connection) || [];
  const [isLoading, setIsLoading] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);

  const dispatch = useDispatch();

  const getConnections = async () => {
    if (ArrayHaveValues(connections)) return;

    try {
      setIsLoading(true);
      const { data = [] } = await get("/users/me/connections");
      dispatch(addConnections(data));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisconnectBtn = async ({ connectionId, userId }) => {
    try {
      setIsRequesting(true);
      const { message } = await del(`/requests/${connectionId}`);

      dispatch(removeConnection(userId));
      ToastService.success(message);
    } catch (error) {
      console.log(error);
    } finally {
      setIsRequesting(false);
    }
  };

  useEffect(() => {
    getConnections();
  }, []);

  return (
    <>
      <h1 className="my-4 text-center text-2xl font-bold">Connections</h1>
      {isLoading && <Loading />}
      {!isLoading && !ArrayHaveValues(connections) && (
        <EmptyState title="No Connections Found" />
      )}
      {!isLoading && ArrayHaveValues(connections) && (
        <div className="flex flex-col gap-5 max-w-3xl mx-auto rounded-lg overflow-auto">
          {connections.map((connection) => (
            <UserList
              key={connection?._id}
              userData={connection}
              isShowDisconnectBtn
              onDisconnect={() =>
                handleDisconnectBtn({
                  connectionId: connection?.connectionId,
                  userId: connection?._id,
                })
              }
              isReviewing={isRequesting}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Connections;
