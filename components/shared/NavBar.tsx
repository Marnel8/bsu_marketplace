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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import CartSheet from "./CartSheet";

const NavBar = () => {
  const [header, setHeader] = useState(false);
  const { data: user, isPending: isUserPending } = useUser();

  const scroll = () => {
    if (window.scrollY > 1) {
      setHeader(true);
    } else {
      setHeader(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scroll);

    return () => {
      window.addEventListener("scroll", scroll);
    };
  }, []);

  return (
    <div
      className={`nav-bar transition-all duration-300 ease-in-out z-50 bg-white w-full ${
        header
          ? "fixed top-0 left-0 shadow-sm"
          : "transition-opacity duration-300"
      }`}
    >
      <nav className="flex gap-20 items-center justify-between w-full">
        <div>
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="BatStateU Marketplace"
              width={50}
              height={50}
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
              <Link href="/auth">Sign in</Link>
            </Button>
          )}
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
