"use client";
import ProductCard from "./ProductCard";
import { useItems } from "@/hooks/useItems";
import { Button } from "../ui/button";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import MiniLoader from "./MiniLoader";
import CardAnimation from "../layout/card-animation";

// Define interfaces for your data structure
export interface Item {
	id: string;
	name: string;
	price: number;
	category: string;
	thumbnail: string | null;
	[key: string]: any;
}

interface GroupedItems {
	[category: string]: Item[];
}

const ProductList = () => {
	const { data: items, isPending: isItemsLoading } = useItems();

	// Group items by category with proper typing
	const groupedItems: GroupedItems = items?.reduce(
		(acc: GroupedItems, item: Item) => {
			if (!acc[item.category]) {
				acc[item.category] = [];
			}
			acc[item.category].push(item);
			return acc;
		},
		{}
	);

	return (
		<section className="py-16 bg-gray-50 w-full">
			<div className="container mx-auto px-4">
				<CardAnimation delay={1}>
					<h2 className="text-3xl font-bold text-center mb-8 text-[#1a2b4b]">
						Featured Products
					</h2>
				</CardAnimation>
				{isItemsLoading ? (
					<div className="w-full flex items-center justify-center">
						<MiniLoader />
					</div>
				) : (
					Object.entries(groupedItems || {}).map(
						([category, categoryItems]) => (
							<div key={category} className="mb-12">
								<CardAnimation delay={1}>
									<h3 className="text-lg text-center capitalize mb-4 text-gray-500">
										{category}
									</h3>
								</CardAnimation>
								<ScrollArea>
									<div className="flex gap-4 justify-center py-5 px-2">
										{categoryItems.map((item: Item, i) => (
											<CardAnimation key={item.id} delay={i * 2}>
												<div className="flex justify-start items-start md:justify-center">
													<ProductCard item={item} />
												</div>
											</CardAnimation>
										))}
									</div>
									<ScrollBar orientation="horizontal" />
								</ScrollArea>
							</div>
						)
					)
				)}
				<div className="mt-12 text-center">
					{/* <Button 
            variant="outline"
            size="lg"
            className="border-[#1a2b4b] text-[#1a2b4b] hover:bg-[#1a2b4b]/5"
          >
            View All Products
          </Button> */}
				</div>
			</div>
		</section>
	);
};

export default ProductList;
