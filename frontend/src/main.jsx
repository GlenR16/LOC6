import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { HomeLayout } from "./layouts/home.layout";
import { GamesLayout } from "./layouts/games.layout";
import SessionDetail from "./pages/SessionDetail";
import Playground from "./pages/Playground";
import SessionList from "./pages/SessionList";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Session from "./pages/Session";
import Profile from "./pages/Profile";
import Index from "./pages/Index";
import GamesList from "./pages/GamesList";

import "./index.css";
ReactDOM.createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<HomeLayout />}>
				<Route index element={<Index />} />
				<Route path="/auth" element={<Outlet /> }>
					<Route path="login" element={<Login />} />
					<Route path="register" element={<Register />} />
				</Route>
				<Route path="dashboard" element={<Dashboard />} />
				<Route path="games" element={<GamesList />} />
				<Route path="history" element={<SessionList />} />
				<Route path="history/:sessionID" element={<SessionDetail />} />

				<Route path="profile" element={<Profile />} />
                <Route path="/session" element={<GamesLayout />}>
                    <Route index element={<Session />} />
                    <Route path=":sessionID" element={<Playground />} />
                </Route>
                <Route path="/test" element={<Playground />} />
			</Route>
		</Routes>
	</BrowserRouter>
);
