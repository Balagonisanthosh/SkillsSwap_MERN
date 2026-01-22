import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserDashBoards from "./dashBoards/UserDashBoard/UserDashBoards";
import PrivateRoute from "./routes/PrivateRoute";
import AdminDashBoard from "./dashBoards/AdminDashBoard";
import "./index.css";
import Profile from "./pages/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/admin",
    element: <AdminDashBoard />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path:"/profile",
    element:<Profile/>

  },
  {
    path: "/userDashboard",
    element: (
      <PrivateRoute>
        <UserDashBoards />
      </PrivateRoute>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
