import Account from "@/components/shared/Account";
import ChangePassword from "@/components/shared/ChangePassword";
import Orders from "@/components/shared/Orders";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProtectedRoute from "@/hoc/ProtectedRoute";
import React from "react";

const AccountPage = () => {
  return (
    <ProtectedRoute>
      <div className="page-wrapper">
        <h1 className="text-2xl font-bold">Account</h1>
        <div className="flex flex-col gap-4 py-5">
          <Tabs
            defaultValue="account"
            className="max-w-full flex flex-col justify-center gap-3 items-center"
          >
            <TabsList className="flex w-[600px] h-[60px] gap-2 shadow-md bg-white p-2 rounded-full">
              <TabsTrigger
                value="account"
                className="tabs-trigger data-[state=active]:shadow-sm data-[state=active]:bg-gray-100 data-[state=active]:text-black"
              >
                Account
              </TabsTrigger>
              <TabsTrigger
                value="password"
                className="tabs-trigger data-[state=active]:shadow-sm data-[state=active]:bg-gray-100 data-[state=active]:text-black"
              >
                Password
              </TabsTrigger>
              <TabsTrigger
                value="orders"
                className="tabs-trigger data-[state=active]:shadow-sm data-[state=active]:bg-gray-100 data-[state=active]:text-black"
              >
                Orders
              </TabsTrigger>
            </TabsList>
            <TabsContent value="account" className="w-[600px]">
              <Account />
            </TabsContent>
            <TabsContent value="password" className="w-[600px]">
              <ChangePassword />
            </TabsContent>
            <TabsContent value="orders" className="w-full">
              <Orders />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AccountPage;
