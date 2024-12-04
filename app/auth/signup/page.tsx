import SignUpForm from "@/components/auth/SignUpForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import React from "react";
import { LuMoveLeft } from "react-icons/lu";

const Signup = () => {
  return (
    <div>
      <SignUpForm />
      <Button variant="link" className=" w-full mt-2">
        <Link className="text-center flex items-center gap-2" href="/">
          <LuMoveLeft /> Back to Home
        </Link>
      </Button>
    </div>
  );
};

export default Signup;
