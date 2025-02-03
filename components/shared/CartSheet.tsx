import { useUser } from "@/hooks/useAuth";
import {
	Sheet,
	SheetContent,
	SheetTitle,
	SheetTrigger,
	SheetClose,
} from "../ui/sheet";
import { HiMiniShoppingBag, HiMiniTrash } from "react-icons/hi2";
import { useCartItems, useRemoveFromCart } from "@/hooks/useCart";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import OrderModal from "./OrderModal";
import { useCreateOrder, useCreateOrderAsGuest } from "@/hooks/useOrders";
import Image from "next/image";
import { X } from "lucide-react";
import { getImageUrl } from "@/utils/imageUtils";

const CartSheet = () => {
	const { data: user } = useUser();
	const { data: cartItems } = useCartItems();
	const {
		mutateAsync: removeFromCart,
		isSuccess: isRemovedFromCart,
		isError: isRemoveFromCartError,
		error: removeFromCartError,
	} = useRemoveFromCart();

	const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState<any>(null);

	const { mutateAsync: createOrder, isPending: isCreatingOrder } =
		useCreateOrder();
	const { mutateAsync: createOrderAsGuest, isPending: isCreatingOrderAsGuest } =
		useCreateOrderAsGuest();

	useEffect(() => {
		if (isRemovedFromCart) {
			toast({
				title: "Item removed from cart",
				description: "You can now view your cart in the sidebar",
			});
		}
		if (isRemoveFromCartError) {
			toast({
				title: "Error",
				description: removeFromCartError?.message || "Please try again",
				variant: "destructive",
			});
		}
	}, [isRemovedFromCart, isRemoveFromCartError, removeFromCartError]);

	const handleOrderNow = (item: any) => {
		setSelectedItem(item);
		setIsOrderModalOpen(true);
	};

	const handleCreateOrder = async (data: any) => {
		try {
			if (!user) {
				await createOrderAsGuest({
					itemId: data.itemId,
					quantity: data.quantity,
					firstName: data.firstName,
					lastName: data.lastName,
					userEmail: data.email,
					contactNumber: data.phone,
				});
			} else {
				await createOrder({
					itemId: data.itemId,
					quantity: data.quantity,
				});
			}
			setIsOrderModalOpen(false);
			toast({
				title: "Order created successfully",
				description: user
					? "Check your orders page"
					: "Check your email for verification",
			});
		} catch (error: any) {
			toast({
				title: "Error creating order",
				description:
					error.response?.data?.message || error.message || "Please try again",
				variant: "destructive",
			});
		}
	};

	return (
		<>
			<Sheet>
				<SheetTrigger asChild>
					<button
						disabled={!user}
						className="relative p-2.5 rounded-full hover:bg-emerald-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						<HiMiniShoppingBag
							className="text-emerald-700 transition-colors duration-300"
							size={24}
						/>
						{cartItems?.length > 0 && (
							<span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center">
								{cartItems?.reduce(
									(acc: number, item: any) => acc + item.quantity,
									0
								)}
							</span>
						)}
					</button>
				</SheetTrigger>

				<SheetContent
					side="right"
					className="w-[400px] sm:w-[450px] bg-white p-6"
				>
					<div className="flex justify-between items-center mb-8">
						<SheetTitle className="text-2xl font-bold ">
							Your Cart
							<span className="block text-sm font-normal text-emerald-600 mt-1">
								{cartItems?.length || 0} item
								{cartItems?.length !== 1 ? "s" : ""} in cart
							</span>
						</SheetTitle>
					</div>

					<div className="space-y-6">
						{cartItems?.map((item: any) => (
							<div
								key={item.id}
								className="flex gap-4 p-4 bg-white border border-emerald-100 rounded-lg"
							>
								<div className="w-20 h-20 relative rounded-md overflow-hidden bg-emerald-50">
									<Image
										src={
											getImageUrl(item?.item?.thumbnail) || "/placeholder.svg"
										}
										alt={item?.item?.name}
										layout="fill"
										objectFit="cover"
										className="transition-transform duration-200 group-hover:scale-105"
									/>
								</div>
								<div className="flex-1 min-w-0">
									<div className="flex justify-between items-start">
										<div>
											<h3 className="font-medium text-emerald-900 mb-1">
												{item?.item?.name}
											</h3>
											<div className="text-sm text-emerald-600">
												Qty: {item?.quantity}
											</div>
										</div>
										<button
											onClick={async () => await removeFromCart(item.item.id)}
											className="text-red-400 hover:text-red-600 transition-colors p-1.5 hover:bg-emerald-50 rounded-full"
										>
											<HiMiniTrash size={16} />
										</button>
									</div>
									<div className="flex justify-between items-center mt-4">
										<div className="text-lg font-medium text-emerald-800">
											₱{Number(item?.item?.price).toLocaleString()}
											<span className="text-sm text-emerald-600 ml-1">
												each
											</span>
										</div>
										<button
											onClick={() => handleOrderNow(item)}
											className="px-2 py-2 text-xs bg-emerald-600 text-white  font-medium rounded-md hover:bg-emerald-700 transition-colors duration-200"
										>
											Order Now
										</button>
									</div>
								</div>
							</div>
						))}

						{cartItems?.length > 0 && (
							<div className="pt-6 border-t border-emerald-100">
								<div className="flex justify-between items-center">
									<span className="text-lg font-bold text-emerald-800">
										Total Amount
									</span>
									<span className="text-2xl font-bold text-emerald-800">
										₱
										{cartItems
											? Number(
													cartItems?.reduce(
														(acc: number, item: any) =>
															acc + item?.item?.price * item?.quantity,
														0
													)
											  ).toLocaleString()
											: "0"}
									</span>
								</div>
							</div>
						)}
					</div>
				</SheetContent>
			</Sheet>
			{selectedItem && (
				<OrderModal
					isOpen={isOrderModalOpen}
					onClose={() => setIsOrderModalOpen(false)}
					onSubmit={handleCreateOrder}
					product={selectedItem.item}
					quantity={selectedItem.quantity}
					isAuthenticated={!!user}
					isPending={isCreatingOrder || isCreatingOrderAsGuest}
				/>
			)}
		</>
	);
};

export default CartSheet;
