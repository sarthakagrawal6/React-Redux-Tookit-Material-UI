import React from "react";
import { Outlet } from "react-router-dom";

const Feature = () => {
  return (
    <div>
      <h1>Feature</h1>
      <Outlet />
    </div>
  );
};

export default Feature;
