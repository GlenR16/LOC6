import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { HomeLayout } from "./layouts/home.layout";
import { GamesLayout } from "./layouts/games.layout";
import Playground from "./pages/Playground";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import Session from "./pages/Session";
import Index from "./pages/Index";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<HomeLayout />}>
				<Route index element={<Index />} />
				<Route
					path="/auth"
					element={
						<>
							Auth <Outlet />
						</>
					}>
					<Route path="login" element={<Login />} />
					<Route path="register" element={<Register />} />
				</Route>
				<Route path="dashboard" element={<Dashboard />} />
				<Route path="profile" element={<>Profile</>} />
			</Route>
			<Route path="/session" element={<GamesLayout />}>
				<Route index element={<Session />} />
				<Route path=":slug" element={<Playground />} />
			</Route>
		</Routes>
	</BrowserRouter>
);
