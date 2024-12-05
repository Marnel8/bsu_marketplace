import Image from "next/image";
import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { FaBagShopping } from "react-icons/fa6";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { AspectRatio } from "../ui/aspect-ratio";
import { getImageUrl } from "@/utils/imageUtils";

const ProductCard = ({ item }: { item: any }) => {
  return (
    <Card className="w-[300px] rounded-lg overflow-hidden">
      <Link href={`/${item.id}`} className="h-full">
        <AspectRatio ratio={5 / 5} className="bg-muted rounded-lg">
          <Image
            src={getImageUrl(item.thumbnail) || "/images/placeholder.png"}
            alt={item.name || "Product image"}
            fill
            className="object-cover p-4 hover:scale-105 transition-transform duration-300 rounded-lg"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
            quality={75}
          />
        </AspectRatio>
        <CardContent className="p-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1.5">
                <h2 className="font-medium text-lg leading-tight">
                  {item.name}
                </h2>
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 fill-current ${
                        i < (item.rating || 0) ? "text-yellow-400" : "text-gray-300"
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                    </svg>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-end gap-1.5">
                <Badge variant="secondary" className="text-xs capitalize">
                  {item.category}
                </Badge>
                <p className="font-bold text-lg">₱{item.price}.00</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default ProductCard;
