import React from "react";
import { Button } from "../ui/button";
import { Store } from "lucide-react";
import { ShoppingBag } from "lucide-react";

const Banner = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-red-50">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1200')] opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 to-white/50" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            Welcome to{" "}
            <span className="text-[#E31837]">BatStateU Marketplace</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg sm:text-xl text-gray-600">
            Your one-stop shop for textbooks, supplies, electronics, and more customized crafts within the
            Batangas State University community.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-[#E31837] hover:bg-[#E31837]/90 text-white font-semibold px-8"
            >
              <ShoppingBag className="mr-2 h-5 w-5" />
              Start Shopping
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-[#E31837] text-[#E31837] hover:bg-[#E31837]/5"
            >
              <Store className="mr-2 h-5 w-5" />
              Start Selling
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
    </section>
  );
};

export default Banner;
