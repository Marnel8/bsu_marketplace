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
        <h2 className="text-3xl font-bold text-center mb-8 text-[#1a2b4b]">
          Featured Products
        </h2>
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
            {items?.map((item: any) => (
              <div className="flex justify-center" key={item.id}>
                <ProductCard item={item} />
              </div>
            ))}
          </div>
        </div>
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
