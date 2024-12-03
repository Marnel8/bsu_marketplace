import Footer from "@/components/shared/Footer";
import MobileNav from "@/components/shared/MobileNav";
import NavBar from "@/components/shared/NavBar";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <section className="flex items-center justify-center h-screen p-10">
        {children}
      </section>
    </>
  );
};

export default MainLayout;
