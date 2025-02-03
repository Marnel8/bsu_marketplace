"use client";
import Image from "next/image";
import Link from "next/link";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Input } from "../ui/input";
import { User, Home, LogOut } from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSignOut, useUser } from "@/hooks/useAuth";

const MobileNav = () => {
	const { mutateAsync: signOut, isSuccess } = useSignOut();
	const { data: user, isPending: isUserPending } = useUser();
	const router = useRouter();

	useEffect(() => {
		if (isSuccess) {
			router.push("/");
		}
	}, [isSuccess]);

	return (
		<div className="header flex items-center justify-between p-4 bg-white">
			<Link href="/">
				<Image
					src="/images/logo_without_txt.png"
					alt="logo"
					width={42}
					height={42}
				/>
			</Link>
			<div className="flex-grow mx-4">
				<Input
					type="text"
					placeholder="Search products"
					className="w-full border-gray-200 focus:ring-red-500 focus:border-red-500 text-sm"
				/>
			</div>
			<nav>
				<Sheet>
					<SheetTrigger asChild>
						<button className="p-2">
							<Image src="/images/menu.png" alt="menu" width={20} height={20} />
						</button>
					</SheetTrigger>
					<SheetContent className="w-64 p-0">
						<div className="flex flex-col h-full bg-white">
							<div className="flex flex-col items-center justify-center border-b">
								<div className=" p-3 flex items-center justify-center">
									<Image
										src="/images/marketplace_logo.png"
										alt="Logo"
										width={170}
										height={100}
									/>
								</div>
								<SheetTitle className="text-lg font-semibold text-center text-[#232323] py-1">
									{user?.user?.firstName || "Guest"} {user?.user?.lastName}
								</SheetTitle>
							</div>
							<nav className="flex-grow">
								<ul className="space-y-1">
									<li>
										<Link
											href="/"
											className="flex items-center px-5 py-2.5 hover:bg-red-50 transition-colors text-gray-700 hover:text-red-600"
										>
											<Home className="mr-3" size={18} />
											<span className="text-sm font-medium">Home</span>
										</Link>
									</li>
									{!isUserPending && user ? (
										<>
											<li>
												<Link
													href="/account"
													className="flex items-center px-5 py-2.5 hover:bg-red-50 transition-colors text-gray-700 hover:text-red-600"
												>
													<User className="mr-3" size={18} />
													<span className="text-sm font-medium">Account</span>
												</Link>
											</li>
											<li>
												<button
													onClick={async () => await signOut()}
													className="flex items-center px-5 py-2.5 w-full text-left hover:bg-red-50 transition-colors text-gray-700 hover:text-red-600"
												>
													<LogOut className="mr-3" size={18} />
													<span className="text-sm font-medium">Sign out</span>
												</button>
											</li>
										</>
									) : (
										<li>
											<Link
												href="/auth"
												className="flex items-center px-5 py-2.5 hover:bg-red-50 transition-colors text-gray-700 hover:text-red-600"
											>
												<User className="mr-3" size={18} />
												<span className="text-sm font-medium">Sign in</span>
											</Link>
										</li>
									)}
								</ul>
							</nav>
							<div className="p-4 text-center text-xs text-gray-500 border-t">
								© 2024 BatStateU Marketplace
							</div>
						</div>
					</SheetContent>
				</Sheet>
			</nav>
		</div>
	);
};

export default MobileNav;
