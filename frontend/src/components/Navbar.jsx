import { Fragment, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink,useNavigate } from "react-router-dom";
import useAxiosAuth from "../api/api";

const navigation = [
	{ name: "Home", href: "/", current: true },
	{ name: "Dashboard", href: "/dashboard", current: false },
	{ name: "Start Session", href: "/session", current: false },
	{ name: "History", href: "/history", current: false },
];

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
	const axios = useAxiosAuth();
	const [user, setUser] = useState(null);
	const token = sessionStorage.getItem("token", null);
    const navigate = useNavigate();

    function logout(){
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("refresh");
        navigate("/auth/login");
    }

	return (
		<Disclosure as="nav" className="bg-gray-800">
			{({ open }) => (
				<>
					<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
						<div className="relative flex h-16 items-center justify-between">
							<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
								{/* Mobile menu button*/}
								<Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
									<span className="absolute -inset-0.5" />
									<span className="sr-only">Open main menu</span>
									{open ? <XMarkIcon className="block h-6 w-6" aria-hidden="true" /> : <Bars3Icon className="block h-6 w-6" aria-hidden="true" />}
								</Disclosure.Button>
							</div>
							<div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
								<div className="flex flex-shrink-0 items-center text-white font-semibold fs-3">Focus Buddy</div>
								<div className="hidden sm:ml-6 sm:block">
									<div className="flex space-x-4">
										{navigation.map((item) => (
											<NavLink key={item.name} to={item.href} className={({ isActive, isPending }) => (isActive ? "bg-gray-900 text-white " : "text-gray-300") +" hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"}>
												{item.name}
											</NavLink>
										))}
									</div>
								</div>
							</div>
							<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
								{token ? (
									<Menu as="div" className="relative ml-3">
										<div>
											<Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
												<span className="absolute -inset-1.5" />
												<span className="sr-only">Open user menu</span>
												<svg viewBox="0 0 24 24" className="w-10 h-10 rounded-full" fill="none" xmlns="http://www.w3.org/2000/svg">
													<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
													<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
													<g id="SVGRepo_iconCarrier">
														{" "}
														<circle cx="12" cy="9" r="3" stroke="#ffffff" strokeWidth="1.5"></circle> <path d="M17.9691 20C17.81 17.1085 16.9247 15 11.9999 15C7.07521 15 6.18991 17.1085 6.03076 20" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"></path>{" "}
													</g>
												</svg>
											</Menu.Button>
										</div>
										<Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
											<Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
												<Menu.Item>
													{({ active }) => (
														<NavLink to="/profile" className={classNames(active ? "bg-gray-100" : "", "block px-4 py-2 text-sm text-gray-700")}>
															Your Profile
														</NavLink>
													)}
												</Menu.Item>
												<Menu.Item>
													{({ active }) => (
														<button onClick={logout} className={classNames(active ? "bg-gray-100" : "", "block w-full text-left px-4 py-2 text-sm text-gray-700")}>
															Sign out
														</button>
													)}
												</Menu.Item>
											</Menu.Items>
										</Transition>
									</Menu>
								) : (
									<NavLink to="/auth/login" className={classNames("text-gray-300 hover:bg-gray-700 hover:text-white", "rounded-md px-3 py-2 text-sm font-medium")}>
										Login
									</NavLink>
								)}
							</div>
						</div>
					</div>

					<Disclosure.Panel className="sm:hidden">
						<div className="space-y-1 px-2 pb-3 pt-2">
							{navigation.map((item) => (
								<Disclosure.Button key={item.name} as="a" href={item.href} className={classNames(item.current ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white", "block rounded-md px-3 py-2 text-base font-medium")} aria-current={item.current ? "page" : undefined}>
									{item.name}
								</Disclosure.Button>
							))}
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
}
