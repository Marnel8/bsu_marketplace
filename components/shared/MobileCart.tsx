"use client";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { useCartItems, useRemoveFromCart } from "@/hooks/useCart";
import { Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { getImageUrl } from "@/utils/imageUtils";

const MobileCart = () => {
	const { data: cartItems } = useCartItems();
	const { mutateAsync: removeFromCart } = useRemoveFromCart();

	const handleRemoveItem = async (itemId: string) => {
		try {
			await removeFromCart(itemId);
			toast({
				title: "Item removed from cart",
				description: "Your cart has been updated",
			});
		} catch (error: any) {
			toast({
				title: "Error",
				description: error.message || "Please try again",
				variant: "destructive",
			});
		}
	};

	const totalAmount = cartItems
		? cartItems.reduce(
				(acc: number, item: any) => acc + item.item.price * item.quantity,
				0
		  )
		: 0;

	return (
		<Card className="w-full max-w-md mx-auto">
			<CardHeader className="space-y-1">
				<h2 className="text-2xl font-bold text-[#1a1a1a]">
					Your Shopping Cart
				</h2>
				<p className="text-base text-gray-500">
					{cartItems?.length || 0} items in cart
				</p>
			</CardHeader>
			<CardContent className="divide-y">
				{cartItems?.map((item: any) => (
					<div key={item.id} className="py-4 flex items-start space-x-4">
						<div className="relative w-16 h-16 flex-shrink-0">
							<Image
								src={getImageUrl(item?.item.thumbnail) || "/placeholder.svg"}
								alt={item.item.name}
								fill
								className="object-contain"
							/>
						</div>
						<div className="flex-grow">
							<p className="font-medium text-[#1a1a1a]">{item.item.name}</p>
							<p className="text-sm text-gray-500">Qty: {item.quantity}</p>
						</div>
						<div className="flex flex-col items-end gap-2">
							<span className="text-[#00856F] font-semibold text-lg">
								₱{Number(item.item.price).toLocaleString()}.00
							</span>
							<Button
								variant="ghost"
								size="sm"
								className="text-gray-500 hover:text-gray-700 p-0 h-auto"
								onClick={() => handleRemoveItem(item.item.id)}
							>
								<Trash2 className="w-4 h-4 mr-1" />
								Remove
							</Button>
						</div>
					</div>
				))}
			</CardContent>
			<CardFooter className="bg-gray-50 p-4 flex justify-between items-center">
				<span className="text-xl font-bold text-[#1a1a1a]">Total Amount</span>
				<span className="text-[#00856F] text-xl font-bold">
					₱{totalAmount.toLocaleString()}.00
				</span>
			</CardFooter>
		</Card>
	);
};

export default MobileCart;
