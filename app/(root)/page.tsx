import Banner from "@/components/shared/Banner";
import CTA from "@/components/shared/CTA";
import Footer from "@/components/shared/Footer";
import Skeleton from "@/components/shared/Skeleton";
import React, { Suspense } from "react";

import dynamic from "next/dynamic";
import ScrollAnimation from "@/components/layout/scroll-animation";

const ProductList = dynamic(() => import("@/components/shared/ProductList"));

const RootPage = () => {
	return (
		<div className="font-roboto">
			<ScrollAnimation>
				<Banner />
			</ScrollAnimation>
			<section className="page-wrapper space-y-6" id="products">
				<Suspense fallback={<Skeleton />}>
					<ProductList />
				</Suspense>
			</section>
			<ScrollAnimation>
				<CTA />
			</ScrollAnimation>
			<ScrollAnimation>
				<Footer />
			</ScrollAnimation>
		</div>
	);
};

export default RootPage;
