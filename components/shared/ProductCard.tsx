import Image from "next/image";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getImageUrl } from "@/utils/imageUtils";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const ProductCard = ({ item }: { item: any }) => {
	const router = useRouter();

	return (
		<Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-md min-w-[150px] md:min-w-[390px] w-[300px] rounded-xl border-0 bg-gradient-to-b from-white to-gray-50">
			<CardHeader className="p-0">
				<div className="relative w-full pt-[100%] overflow-hidden">
					<Image
						src={
							item.thumbnail
								? getImageUrl(item.thumbnail)
								: "/images/placeholder.png"
						}
						alt={item.name}
						fill
						className="object-cover absolute top-0 left-0 transition-transform duration-300 group-hover:scale-105"
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					/>
					<Badge className="absolute capitalize top-4 left-4 bg-white text-[#1a2b4b] font-semibold px-4 py-1.5 rounded-full shadow-md">
						{item.category}
					</Badge>
				</div>
			</CardHeader>
			<CardContent className="flex-1 p-8 flex items-center justify-between">
				<CardTitle className="text-2xl font-bold  text-[#1a2b4b]">
					{item.name}
				</CardTitle>
				<p className="text-2xl font-bold text-[#E31837] mt-auto">
					₱{item.price.toLocaleString()}
				</p>
			</CardContent>
			<CardFooter className="p-8 pt-0 mt-auto">
				<Button
					className="w-full bg-primary-400 hover:bg-primary-400 hover:opacity-75 text-white transition-all duration-300 py-7 text-lg font-semibold rounded-xl shadow-lg "
					onClick={() => router.push(`/${item.id}`)}
				>
					View Details <ArrowRight className="ml-2 h-5 w-5" />
				</Button>
			</CardFooter>
		</Card>
	);
};

export default ProductCard;
