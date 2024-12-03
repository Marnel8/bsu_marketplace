import Orders from "@/components/shared/Orders";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

const AccountPage = () => {
  return (
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
            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>
                  Make changes to your account here. Click save when you're
                  done.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue="Pedro Duarte" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" defaultValue="@peduarte" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="password" className="w-[600px]">
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>
                  Change your password here. After saving, you'll be logged out.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="current">Current password</Label>
                  <Input id="current" type="password" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="new">New password</Label>
                  <Input id="new" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save password</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="orders" className="w-full">
            <Orders />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AccountPage;
