import React, { Suspense, use } from "react";

import Product from "@/components/shared/Product";
import api from "../../../utils/api";

export async function generateStaticParams() {
	const products = await api.get("/item");
	return products && products.data.map((item: any) => ({ productId: item.id }));
}

const ProductPage = async ({
	params,
}: {
	params: Promise<{ productId: string }>;
}) => {
	const productId = (await params).productId;

	return <Product productId={productId} />;
};

export default ProductPage;
