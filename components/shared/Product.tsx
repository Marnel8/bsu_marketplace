"use client";

import React, { Suspense } from "react";
import Skeleton from "./Skeleton";
import ProductImages from "./ProductImages";
import ProductDetails from "./ProductDetails";
import { useItemById } from "@/hooks/useItems";
import { getImageUrl } from "@/utils/imageUtils";

const Product = ({ productId }: { productId: string }) => {
	const { data: product, isPending } = useItemById(productId);

	const productImages = (product &&
		!isPending &&
		product?.images.map((image: any) => getImageUrl(image?.url))) || [
		product?.thumbnail,
	];

	return (
		<div className="page-wrapper px-4 md:px-20 pt-4 relative z-0 font-roboto">
			{product && (
				<div className="flex flex-col md:flex-row gap-6 md:gap-10 max-w-7xl mx-auto">
					<Suspense fallback={<Skeleton />}>
						<ProductImages images={productImages} />
					</Suspense>

					<Suspense fallback={<Skeleton />}>
						<ProductDetails product={product} />
					</Suspense>
				</div>
			)}
		</div>
	);
};

export default Product;
