import { selectUser } from "modules/auth/auth.slice";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const user = useSelector(selectUser);

  useEffect(() => {}, []);

  const getPosts = () => {};

  const handleUser = () => {
    getPosts();
  };
  return (
    <div>
      <h1>{user?.firstName}</h1>
      <button onClick={handleUser}>Click Me</button>
    </div>
  );
};

export default Dashboard;
