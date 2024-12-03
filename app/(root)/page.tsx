import Banner from "@/components/shared/Banner";
import ProductList from "@/components/shared/ProductList";
import WhyChooseUs from "@/components/shared/WhyChooseUs";
import React from "react";

const RootPage = () => {
  return (
    <div>
      <Banner />
      <div className="page-wrapper space-y-6" id="products">
        <h1 className="page-title">Our Products</h1>
        <div className="">
          <ProductList />
        </div>
      </div>
    </div>
  );
};

export default RootPage;
