import React from "react";

import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import AdminComponents from "./Admin.components";
function Admin() {
  const user = useSelector((state) => state.userReducer.user);
  const isLoad = useSelector((state) => state.userReducer.isLoad);
  return (
    <div>
      {isLoad ? (
        <h3>Wait....</h3>
      ) : user && user.role == "admin" ? (
        <AdminComponents />
      ) : (
        <Redirect to="/Login" />
      )}
    </div>
  );
}

export default Admin;
