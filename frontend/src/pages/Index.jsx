import { NavLink } from "react-router-dom";
export default function Index() {
	return (
		<section className="bg-base-100">
			<div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
				<div className="mr-auto place-self-center lg:col-span-7">
					<h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl">A Digital Companion for Focus Enhancement</h1>
					<p className="max-w-2xl mb-6 font-light lg:mb-8 md:text-lg lg:text-xl">Transforming Challenges into Opportunities: Enhance Focus, Calm, and Learning with Focus Buddy's Innovative Digital Companion.</p>
					<div className="flex flex-row gap-2">
                        <NavLink to="/auth/login" className="btn btn-accent">
                            Get started
                        </NavLink>
                        <NavLink href="#" className="btn">
                            About Us
                        </NavLink>
                    </div>
				</div>
				<div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
					<img src="/landing.png" alt="mockup" />
				</div>
			</div>
		</section>
	);
}
