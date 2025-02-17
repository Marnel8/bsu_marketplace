"use client";
import ProductCard from "./ProductCard";
import { useItems } from "@/hooks/useItems";
import { Button } from "../ui/button";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

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
				<h2 className="text-3xl font-bold text-center mb-8 text-[#1a2b4b]">
					Featured Products
				</h2>
				{isItemsLoading ? (
					<div className="text-center">Loading...</div>
				) : (
					Object.entries(groupedItems || {}).map(
						([category, categoryItems]) => (
							<div key={category} className="mb-12">
								<h3 className="text-2xl text-center capitalize font-semibold mb-4 text-[#1a2b4b]">
									{category}
								</h3>
								<ScrollArea>
									<div className="flex gap-4 justify-center py-10 px-2">
										{categoryItems.map((item: Item) => (
											<div className="flex justify-center" key={item.id}>
												<ProductCard item={item} />
											</div>
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
