import React from "react";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div>
      <h1 className="bg-red-500">Testing Project Setup</h1>
      <Outlet></Outlet>
    </div>
  );
};

export default Root;
