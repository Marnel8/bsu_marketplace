import React from "react";
import { Button } from "../ui/button";

const Banner = () => {
  return (
    <div >
      <div className="w-full h-[500px] bg-primary flex items-center justify-center md:justify-start">
        <div className="flex flex-col justify-center items-center md:items-start md:p-[5%] 3xl:px-[20%]">
          <h1 className="text-white md:leading-[70px] lg:leading-[100px] font-semibold text-center text-[25px] md:text-left md:text-[50px] lg:text-[80px] md:w-[70%]">
            Welcome to BatStateU Marketplace
          </h1>
          <p className="text-gray-50 text-center md:text-left">Discover amazing products from Batangas State University</p>
          <Button 
            variant="outline" 
            className="tracking-wide mt-8 hover:text-primary-400 hover:bg-white border-white bg-transparent text-white transition-colors duration-300"
            size="lg"
          >
            Explore Products
          </Button>
        </div>
        <div className="absolute bottom-0 right-0"></div>
      </div>
    </div>
  );
};

export default Banner;
