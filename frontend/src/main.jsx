import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { HomeLayout } from "../layouts/home.layout";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<>Landing</>} />
          <Route
            path="/auth"
            element={
              <>
                Auth <Outlet />
              </>
            }
          >
            <Route path="login" element={<>Login</>} />
            <Route path="register" element={<>Register</>} />
          </Route>
          <Route path="dashboard" element={<>Dash board</>} />
          <Route path="profile" element={<>Profile</>} />
          <Route  path="/"/>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
