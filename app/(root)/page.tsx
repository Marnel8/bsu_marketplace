import Banner from "@/components/shared/Banner";
import CTA from "@/components/shared/CTA";
import Footer from "@/components/shared/Footer";
import ProductList from "@/components/shared/ProductList";
import React from "react";

const RootPage = () => {
  return (
    <div>
      <Banner />
      <div className="page-wrapper space-y-6" id="products">
        <ProductList />
      </div>
      <CTA />
      <Footer />
    </div>
  );
};

export default RootPage;
