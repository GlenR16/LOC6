import { useState, useEffect } from "react";
import { useNavigate,NavLink } from "react-router-dom";
import useAxiosAuth from "../api/api.js";

export default function Register() {
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const navigate = useNavigate();
	const axios = useAxiosAuth();

	function handleRegister(e) {
		e.preventDefault();
		if (password !== confirmPassword) {
			alert("Password do not match");
			return;
		}
		axios
			.post("/user", {
				name: name,
				phone: phone,
				email: email,
				password: password,
			})
			.then(function (response) {
				console.log(response);
				navigate("/login");
			})
			.catch(function (error) {
				console.log(error);
			});
	}
	return (
		<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Register new account</h2>
			</div>

			<div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
				<form className="space-y-4" onSubmit={handleRegister}>
					<div>
						<label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
							Full name
						</label>
						<div className="mt-2">
							<input id="name" name="name" type="text" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
						</div>
					</div>
					<div>
						<label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
							Phone number
						</label>
						<div className="mt-2">
							<input id="phone" name="phone" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="phone" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
						</div>
					</div>

					<div>
						<label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
							Email address
						</label>
						<div className="mt-2">
							<input id="email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
						</div>
					</div>

					<div>
						<div className="flex items-center justify-between">
							<label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
								Password
							</label>
						</div>
						<div className="mt-2">
							<input id="password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
						</div>
					</div>
					<div>
						<div className="flex items-center justify-between">
							<label htmlFor="confirm-password" className="block text-sm font-medium leading-6 text-gray-900">
								Comfirm Password
							</label>
						</div>
						<div className="mt-2">
							<input id="confirm-password" name="confirm-password" type="confirm-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
						</div>
					</div>

					<div>
						<button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
							Sign in
						</button>
					</div>

					<p className="mt-10 text-center text-sm text-gray-500">
						Already have an account?{" "}
						<NavLink to="/auth/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
							Login here
						</NavLink>
					</p>
				</form>
			</div>
		</div>
	);
}
