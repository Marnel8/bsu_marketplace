import Account from "@/components/shared/Account";
import ChangePassword from "@/components/shared/ChangePassword";
import Orders from "@/components/shared/Orders";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProtectedRoute from "@/hoc/ProtectedRoute";
import React from "react";

const AccountPage = () => {
	return (
		<ProtectedRoute>
			<div className="page-wrapper px-4 sm:px-6 lg:px-8 ">
				<h1 className="text-xl sm:text-2xl text-center font-bold mb-4 sm:mb-6 mt-[80px] md:mt-[10px]">
					Account
				</h1>
				<div className="flex flex-col gap-4 py-3 sm:py-5">
					<Tabs
						defaultValue="orders"
						className="w-full max-w-3xl mx-auto flex flex-col justify-center gap-3 items-center"
					>
						<TabsList className="w-full max-w-[600px] h-12 bg-white rounded-full shadow-md p-1.5">
							<TabsTrigger
								value="orders"
								className="flex-1 h-full rounded-full text-sm font-medium transition-all data-[state=active]:bg-gray-100 data-[state=active]:text-black data-[state=active]:shadow-sm"
							>
								Orders
							</TabsTrigger>
							<TabsTrigger
								value="account"
								className="flex-1 h-full rounded-full text-sm font-medium transition-all data-[state=active]:bg-gray-100 data-[state=active]:text-black data-[state=active]:shadow-sm"
							>
								Account
							</TabsTrigger>
							<TabsTrigger
								value="password"
								className="flex-1 h-full rounded-full text-sm font-medium transition-all data-[state=active]:bg-gray-100 data-[state=active]:text-black data-[state=active]:shadow-sm"
							>
								Password
							</TabsTrigger>
						</TabsList>
						<TabsContent value="account" className="w-full max-w-[600px]">
							<Account />
						</TabsContent>
						<TabsContent value="password" className="w-full max-w-[600px]">
							<ChangePassword />
						</TabsContent>
						<TabsContent value="orders" className="w-full max-w-[600px]">
							<Orders />
						</TabsContent>
					</Tabs>
				</div>
			</div>
		</ProtectedRoute>
	);
};

export default AccountPage;
