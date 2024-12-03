import Footer from "@/components/shared/Footer";
import MobileNav from "@/components/shared/MobileNav";
import NavBar from "@/components/shared/NavBar";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <header>
        <NavBar />
        <MobileNav />
      </header>
      <main className="">{children}</main>
      <footer className="">
        {/* <Footer /> */}
      </footer>
    </>
  );
};

export default MainLayout;
