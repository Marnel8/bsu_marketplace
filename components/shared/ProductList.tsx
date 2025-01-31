"use client";
import React from "react";
import ProductCard from "./ProductCard";
import { useItems } from "@/hooks/useItems";
import { Button } from "../ui/button";

const ProductList = () => {
  const { data: items, isPending: isItemsLoading } = useItems();

  return (
    <section className="py-16 bg-gray-50 w-full">
      <div className="container mx-auto px-4">
        {}
        <h2 className="text-3xl font-bold text-center mb-8 text-[#1a2b4b]">
          Featured Products
        </h2>

        {/* Scrollable Product List */}
        <div className="relative">
          <div className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 scrollbar-hide">
            {items?.map((item: any) => (
              <div key={item.id} className="snap-center flex-shrink-0 w-60">
                <ProductCard item={item} />
              </div>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <Button
            variant="outline"
            size="lg"
            className="border-[#1a2b4b] text-[#1a2b4b] hover:bg-[#1a2b4b]/5"
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductList;
