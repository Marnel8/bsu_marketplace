import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Input } from "../ui/input";

const MobileNav = () => {
  return (
    <div className="header">
      <Link href="/">
        <Image src="/images/logo.png" alt="logo" width={42} height={42} />
      </Link>
      <div>
        <div className="w-full">
          <Input type="text" placeholder="Search products" />
        </div>
      </div>
      <nav className="">
        <Sheet>
          <SheetTrigger asChild>
            <Image src="/images/menu.png" alt="menu" width={32} height={32} />
          </SheetTrigger>
          <SheetContent className="sm:w-60 w-[20px] px-40 sheet-content">
            <SheetTitle></SheetTitle>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};

export default MobileNav;
