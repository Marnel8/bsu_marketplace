"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { HiMiniShoppingBag } from "react-icons/hi2";
import { useUser } from "@/hooks/useAuth";
import { Avatar, AvatarFallback } from "../ui/avatar";
import UserAvatar from "./Avatar";

import CartSheet from "./CartSheet";

const NavBar = () => {
	const { data: user, isPending: isUserPending } = useUser();

	const [isSticky, setIsSticky] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 100) {
				setIsSticky(true);
			} else {
				setIsSticky(false);
			}
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<div
			className={`nav-bar fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
				isSticky
					? "bg-white/70 backdrop-blur-md shadow-sm py-2"
					: "bg-transparent py-4"
			}`}
		>
			<nav className="flex gap-20 items-center justify-between w-full">
				<div>
					<Link href="/">
						<Image
							src="/images/marketplace_logo.png"
							alt="BatStateU Marketplace"
							width={180}
							height={100}
						/>
					</Link>
				</div>
				<div className="flex-1 ">
					<Input type="text" placeholder="Search products" />
				</div>
				<div className="flex gap-4 items-center">
					<CartSheet />
					{!isUserPending && user ? (
						<UserAvatar user={user} />
					) : (
						<Button variant="outline">
							<a href="/auth">Sign in</a>
						</Button>
					)}
				</div>
			</nav>
		</div>
	);
};

export default NavBar;
