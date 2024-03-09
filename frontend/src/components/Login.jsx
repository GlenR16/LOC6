import {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import useAxiosAuth from "../api/api.js"
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";

const navigation = [
	{ name: "Dashboard", href: "#", current: false },
	{ name: "Games", href: "#", current: false },
	{ name: "Sessions", href: "#", current: false },
	{ name: "Reports", href: "#", current: false },
];

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}


function Login() {
	  const [email, setEmail] = useState('')	
	  const [password, setPassword] = useState('')
	  const [error, setError] = useState('')
	  const [loading, setLoading] = useState(false)
	  const [submitted, setSubmitted] = useState(false)

	const navigate = useNavigate()

	function handleLogin(e) {
		e.preventDefault()
		setSubmitted(true)
		setLoading(true)
	}

	const axios = useAxiosAuth()
	  useEffect(() => {
		if (submitted) {
			axios.post('/token/', {
				email: email,
				password: password
			})
			.then(response => {
				sessionStorage.setItem('token', response.data.access)
				sessionStorage.setItem('refresh', response.data.refresh)
				setLoading(false)
				setSubmitted(false)
				navigate("/dashboard")
			})
			.catch(error => {
				console.log(error)
				setLoading(false)
				setSubmitted(false)
			})
		}
	  }, [submitted])
	  
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<img
					className="mx-auto h-10 w-auto"
					src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
					alt="Your Company"
				/>
				<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
					Log in to your account
				</h2>
			</div>

			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
				<form className="space-y-6" onSubmit={handleLogin}>
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium leading-6 text-gray-900">
							Email address
						</label>
						<div className="mt-2">
							<input
								id="email"
								name="email"
								type="email"
								value={email}
								onChange={e => setEmail(e.target.value)}
								autoComplete="email"
								required
								className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>

					<div>
						<div className="flex items-center justify-between">
							<label
								htmlFor="password"
								className="block text-sm font-medium leading-6 text-gray-900">
								Password
							</label>
							<div className="text-sm">
								<a
									href="./forgotpassword"
									className="font-semibold text-indigo-600 hover:text-indigo-500">
									Forgot password?
								</a>
							</div>
						</div>
						<div className="mt-2">
							<input
								id="password"
								name="password"
								type="password"
								value={password}
								onChange={e => setPassword(e.target.value)}
								autoComplete="current-password"
								required
								className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>

					<div>
						<button
							type="submit"
							className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
							Sign in
						</button>
					</div>
				</form>

				<p className="mt-10 text-center text-sm text-gray-500">
					Don't have an account?{" "}
					<a
						href="./register"
						className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
						Register here
					</a>
				</p>
			</div>
		</div>
  )
}

export default Login