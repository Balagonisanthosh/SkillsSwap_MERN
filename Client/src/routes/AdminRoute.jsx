import React from 'react'
import { Navigate } from 'react-router';

const AdminRoute = (props) => {
    const {children} = props;

    const token =localStorage.getItem("token");
    const role=localStorage.getItem("role");

    if(!token)
    {
        alert("access denied");
        return <Navigate to="/login" replace/>
    }
    if(role !== "admin")
    {
        alert("only admin is allowed to these page");
        return <Navigate to="/" replace/>
    }
  return (
    children
  )
}
export default AdminRoute;
