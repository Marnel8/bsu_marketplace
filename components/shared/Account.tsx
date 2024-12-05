"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useUpdateUser, useUser } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";

const Account = () => {
  const { data: user, isPending } = useUser();
  const [firstName, setFirstName] = useState(user?.user.firstName);
  const [lastName, setLastName] = useState(user?.user.lastName);
  const [contactNumber, setContactNumber] = useState(user?.user.contactNumber);
  const [age, setAge] = useState(user?.user.age);
  const [email, setEmail] = useState(user?.user.email);
  const { mutateAsync: updateUser, isSuccess } = useUpdateUser();

  const handleUpdateUser = async () => {
    await updateUser({
      id: user?.user.id,
      firstName: firstName,
      lastName: lastName,
      contactNumber: contactNumber,
      age: age,
      email: email,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "User updated successfully",
        description: "Your account has been updated",
      });
      setFirstName(user?.user.firstName);
      setLastName(user?.user.lastName);
      setContactNumber(user?.user.contactNumber);
      setAge(user?.user.age);
      setEmail(user?.user.email);
    }
  }, [isSuccess]);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Points Balance</CardTitle>
          <CardDescription>
            Your current points balance. 1 point = 1 peso.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {user?.user.points || 0} point/s
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>
            Make changes to your account here. Click save when you're done.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex gap-4">
            <div className="space-y-1 flex-1">
              <Label htmlFor="firstname">First Name</Label>
              <Input
                id="firstname"
                defaultValue={user?.user.firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="space-y-1 flex-1">
              <Label htmlFor="lastname">Last Name</Label>
              <Input
                id="lastname"
                defaultValue={user?.user.lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              defaultValue={user?.user.email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <div className="space-y-1 flex-1">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                defaultValue={user?.user.age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div className="space-y-1 flex-1">
              <Label htmlFor="contact">Contact Number</Label>
              <Input
                id="contact"
                type="tel"
                defaultValue={user?.user.contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button disabled={isPending} onClick={handleUpdateUser}>
            {isPending ? "Saving..." : "Save changes"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Account;
