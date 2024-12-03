import SignInForm from "@/components/auth/SignInForm";
import SignUpForm from "@/components/auth/SignUpForm";
import { LuMoveLeft } from "react-icons/lu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const AuthPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div>
        <SignInForm />
        <Button variant="link" className=" w-full mt-2">
          <Link className="text-center flex items-center gap-2" href="/">
            <LuMoveLeft /> Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default AuthPage;
