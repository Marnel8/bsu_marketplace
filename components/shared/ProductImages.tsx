import { useState } from "react";
import Image from "next/image";
import React from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ProductImagesProps {
  images: string[];
}

const ProductImages = ({ images }: ProductImagesProps) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="flex-1 animate-fade-in pt-20 md:pt-0">
      <AspectRatio
        ratio={14 / 9}
        className="mb-4 transition-all duration-300 ease-in-out hover:scale-[1.02]"
      >
        <div className="absolute inset-0 bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src={selectedImage}
            alt="Product image"
            fill
            sizes="(max-width: 768px) 80vw, 40vw"
            quality={85}
            priority
            className="object-contain rounded-lg"
          />
        </div>
      </AspectRatio>
      <div className="grid grid-cols-4 gap-2">
        {images?.map((image, index) => (
          <AspectRatio
            key={index}
            ratio={1}
            className={`relative rounded-lg overflow-hidden cursor-pointer 
              transition-all duration-300 ease-in-out hover:scale-105 hover:opacity-80
              animate-fade-in-up ${
                selectedImage === image ? "ring-2 ring-blue-500" : ""
              }`}
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={() => setSelectedImage(image)}
          >
            <Image
              src={image}
              alt={`Product thumbnail ${index + 1}`}
              fill
              sizes="(max-width: 768px) 20vw, 10vw"
              quality={75}
              className="object-cover"
            />
          </AspectRatio>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
