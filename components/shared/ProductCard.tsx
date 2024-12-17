import Image from "next/image";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { getImageUrl } from "@/utils/imageUtils";
import { ArrowRight } from "lucide-react";
import { get } from "http";
import { useRouter } from "next/navigation";

const ProductCard = ({ item }: { item: any }) => {
  const router = useRouter();
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="relative w-full pt-[100%]">
          {" "}
          {/* Creates a 1:1 aspect ratio container */}
          <Image
            src={ item.thumbnail ? getImageUrl(item.thumbnail) : "/images/placeholder.png"}
            alt={item.name}
            fill
            className="object-cover absolute top-0 left-0"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <Badge  className="absolute capitalize top-2 right-2 bg-[#1a2b4b]">
            {item.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-4">
        <CardTitle className="text-lg mb-2 text-[#1a2b4b]">
          {item.name}
        </CardTitle>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2 h-10">
          {item.description}
        </p>
        <p className="text-lg font-semibold text-[#E31837]">
          ₱{item.price.toFixed(2)}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 mt-auto">
        <Button
          className="w-full bg-[#E31837] hover:bg-[#E31837]/90 text-white hover:text-white"
          variant="ghost"
          onClick={() => router.push(`/${item.id}`)}
        >
          View Details <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
