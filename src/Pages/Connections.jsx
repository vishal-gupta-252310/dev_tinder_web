import React, { useEffect } from 'react'
import UserList from '../Components/UserList'
import { useDispatch, useSelector } from 'react-redux'
import { ArrayHaveValues } from '../Services/helper';
import { get } from '../Services/HttpService';
import { addConnections } from '../Redux/reducers/connectionReducer';
import { useState } from 'react';
import Loading from '../Components/Loading';

const Connections = () => {
const connections = useSelector((store) => store.connection) || [];
const [isLoading, setIsLoading] = useState(false);

const dispatch = useDispatch();

const getConnections = async () => {
    if(ArrayHaveValues(connections)) return;

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

useEffect(() => {
    getConnections();
}, []);

if(isLoading) return <Loading />;

if (!connections) return null;

if(!ArrayHaveValues(connections)) return <h1 className="my-4 text-center text-2xl font-bold">No Connections Found</h1>;

  return (
    <>
    <h1 className="my-4 text-center text-2xl font-bold">Connections</h1>
        <div className="flex flex-col gap-5 max-w-3xl mx-auto rounded-lg overflow-auto">
        {connections.map((connection) => (
            <UserList key={connection?._id} userData={connection}/>
        ))}
        </div>
    </>
  )
}

export default Connections