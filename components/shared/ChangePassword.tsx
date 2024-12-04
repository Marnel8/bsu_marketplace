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
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useChangePassword } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
const ChangePassword = () => {
  const {
    mutateAsync: changePassword,
    isPending,
    isSuccess,
  } = useChangePassword();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const handleChangePassword = async () => {
    await changePassword({ oldPassword: currentPassword, newPassword });
    setCurrentPassword("");
    setNewPassword(""); 
  };

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Password changed successfully",
      });
    }
  }, [isSuccess]);
  return (
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
          <Input
            id="current"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="new">New password</Label>
          <Input
            id="new"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button disabled={isPending} onClick={handleChangePassword}>
          {isPending ? "Saving..." : "Save password"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ChangePassword;
