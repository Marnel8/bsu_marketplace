import MobileNav from "@/components/shared/MobileNav";
import NavBar from "@/components/shared/NavBar";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<header>
				<NavBar />
				<MobileNav />
			</header>
			<main className="min-h-screen lg:mt-[80px]">{children}</main>
		</>
	);
};

export default MainLayout;
