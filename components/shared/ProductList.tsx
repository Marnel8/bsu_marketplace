"use client";
import React from "react";
import ProductCard from "./ProductCard";
import { useItems } from "@/hooks/useItems";

const ProductList = () => {
  const { data: items, isPending: isItemsLoading } = useItems();
  return (
    <div className="flex w-full gap-4 flex-wrap justify-center md:justify-start">
      {items?.map((item: any) => (
        <ProductCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ProductList;
