import React, { Suspense, use } from "react";

import Product from "@/components/shared/Product";

const ProductPage = async ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  const productId = (await params).productId;

  return <Product productId={productId} />;
};

export default ProductPage;
