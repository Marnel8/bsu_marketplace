import Banner from "@/components/shared/Banner";
import CTA from "@/components/shared/CTA";
import Footer from "@/components/shared/Footer";
import Skeleton from "@/components/shared/Skeleton";
import React, { Suspense } from "react";

import dynamic from "next/dynamic";

const ProductList = dynamic(() => import("@/components/shared/ProductList"));

const RootPage = () => {
	return (
		<div>
			<Banner />
			<div className="page-wrapper space-y-6" id="products">
				<Suspense fallback={<Skeleton />}>
					<ProductList />
				</Suspense>
			</div>
			<CTA />
			<Footer />
		</div>
	);
};

export default RootPage;
