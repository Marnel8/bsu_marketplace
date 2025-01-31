import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IoStar } from "react-icons/io5";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useUser } from "@/hooks/useAuth";
import { useAddToCart } from "@/hooks/useCart";
import { toast } from "@/hooks/use-toast";
import {
	useConfirmOrder,
	useCreateOrder,
	useCreateOrderAsGuest,
	useUpdateOrder,
} from "@/hooks/useOrders";
const ProductDetails = ({ product }: { product: any }) => {
	const [count, setCount] = useState(1);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [guestEmail, setGuestEmail] = useState("");
	const [guestPhone, setGuestPhone] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
	const [verificationCode, setVerificationCode] = useState("");
	const [orderId, setOrderId] = useState<string>("");

	const { data: user, isPending: isUserPending } = useUser();
	const {
		mutateAsync: createOrder,
		isPending: isCreatingOrder,
		isSuccess: isOrderCreated,
		isError: isCreatingOrderError,
		error: creatingOrderError,
	} = useCreateOrder();

	const {
		mutateAsync: createOrderAsGuest,
		isPending: isCreatingOrderAsGuest,
		isError: isCreatingOrderAsGuestError,
		error: creatingOrderAsGuestError,
		isSuccess: isOrderCreatedAsGuest,
	} = useCreateOrderAsGuest();

	const {
		mutateAsync: confirmOrder,
		isPending: isConfirmingOrder,
		isError: isConfirmingOrderError,
		error: confirmingOrderError,
		isSuccess: isOrderConfirmed,
	} = useConfirmOrder();

	const {
		mutateAsync: addToCart,
		isPending: isAddingToCart,
		isSuccess: isAddedToCart,
		isError: isAddingToCartError,
		error: addingToCartError,
	} = useAddToCart();

	const {
		mutateAsync: updateOrder,
		isPending: isUpdatingOrder,
		isError: isUpdatingOrderError,
		error: updatingOrderError,
	} = useUpdateOrder();

	const increment = () => {
		if (count < product.quantity) {
			setCount(count + 1);
		}
	};
	const decrement = () => setCount(count - 1);

	const handleOrderNow = () => {
		setIsModalOpen(true);
	};

	const handleCreateOrder = async ({
		itemId,
		quantity,
	}: {
		itemId: string;
		quantity: number;
	}) => {
		if (!user) {
			const response = await createOrderAsGuest({
				itemId,
				quantity,
				firstName,
				lastName,
				userEmail: guestEmail,
				contactNumber: guestPhone,
			});

			setOrderId(response.id);
			setIsModalOpen(false);
			setIsVerificationModalOpen(true);
		} else {
			const response = await createOrder({ itemId, quantity });
			setOrderId(response.orderId);
			setIsModalOpen(false);
			toast({
				title: "Order confirmed",
				description: "You can now view your order in the orders page",
			});
		}
	};

	const handleCancelOrder = async () => {
		try {
			await updateOrder({ orderId, status: "cancelled" });
			setIsVerificationModalOpen(false);
			toast({
				title: "Order cancelled",
				description: "Your order has been cancelled successfully",
			});
		} catch (error) {
			toast({
				title: "Error",
				description: "Failed to cancel the order",
				variant: "destructive",
			});
		}
	};

	useEffect(() => {
		if (isOrderCreated && !user) {
			setIsModalOpen(false);
			setIsVerificationModalOpen(true);
			toast({
				title: "Order created",
				description: "Please check your email for the verification code",
			});
		}
		if (isCreatingOrderError) {
			toast({
				title: "Error",
				description: creatingOrderError?.message || "Something went wrong",
				variant: "destructive",
			});
		}
	}, [isOrderCreated, user]);

	const handleAddToCart = async () => {
		await addToCart({ itemId: product.id, quantity: count });
	};

	useEffect(() => {
		if (isAddedToCart) {
			toast({
				title: "Item added to cart",
				description: "You can now view your cart in the sidebar",
			});
		}
		if (isAddingToCartError) {
			toast({
				title: "Error",
				description: addingToCartError?.message || "Something went wrong",
				variant: "destructive",
			});
		}
	}, [isAddingToCart]);

	useEffect(() => {
		if (isOrderConfirmed) {
			setIsVerificationModalOpen(false);
			toast({
				title: "Order confirmed",
				description: "please wait for the order to be processed",
			});
		}
		if (isConfirmingOrderError) {
			toast({
				title: "Error",
				description: confirmingOrderError?.message || "Something went wrong",
				variant: "destructive",
			});
		}
	}, [isOrderConfirmed]);

	return (
		<div className="flex-1 max-w-xl animate-fade-in-right">
			<div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
				<span>Products</span>
				<span>/</span>
				<span className="capitalize">{product.category}</span>
				<span>/</span>
				<span>{product.name}</span>
			</div>
			<div className="space-y-4">
				<h1 className="text-3xl font-bold">{product.name}</h1>

				<div className="flex items-center gap-2">
					<div className="flex items-center text-yellow-400">
						{[...Array(5)].map((_, index) => (
							<IoStar
								key={index}
								className={
									index < Math.floor(product.rating) ? "" : "text-gray-300"
								}
							/>
						))}
					</div>
					<span className="text-sm text-gray-500">{product.rating}</span>
				</div>

				<div className="flex items-center gap-2">
					<span className="text-2xl font-bold">
						₱{product.price.toLocaleString()}.00
					</span>
				</div>

				<div className="flex items-center gap-2">
					<Badge variant="outline" className="text-sm">
						{product.quantity > 0
							? `${product.quantity - count} in stock`
							: "Out of stock"}
					</Badge>
				</div>

				<div className="text-gray-600">
					{product.description.includes(";") ? (
						<ul className="list-disc pl-4 space-y-1">
							{product.description
								.split(";")
								.map((point: string, index: number) => (
									<li key={index}>{point.trim()}</li>
								))}
						</ul>
					) : (
						<p>{product.description}</p>
					)}
				</div>

				<div
					className="flex flex-col gap-3 max-w-sm animate-fade-in-up"
					style={{ animationDelay: "650ms" }}
				>
					<div className="flex items-center gap-3">
						<div className="flex border justify-between rounded-md w-32">
							<Button
								variant="ghost"
								onClick={decrement}
								disabled={count <= 1}
								className="px-3"
							>
								-
							</Button>
							<Input
								type="number"
								className="w-12 text-center border-none p-0"
								value={count}
								max={product.quantity}
								disabled
							/>
							<Button
								variant="ghost"
								onClick={increment}
								className="px-3"
								disabled={count >= product?.quantity}
							>
								+
							</Button>
						</div>
						<Button
							className="flex-1 bg-teal-500 hover:bg-teal-600"
							disabled={!user || product.quantity < count || isAddingToCart}
							onClick={handleAddToCart}
						>
							Add to cart
						</Button>
					</div>
					<Button
						className="w-full bg-primary-400 hover:bg-primary/80"
						onClick={handleOrderNow}
						disabled={count > product.quantity || isAddingToCart}
					>
						Order now
					</Button>
				</div>

				<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
					<DialogContent className="max-w-[95vw] w-full md:max-w-[425px] max-h-[90vh] overflow-y-auto scrollbar-hide">
						<DialogHeader>
							<DialogTitle>Complete Your Order</DialogTitle>
							<DialogDescription>
								Please review your order and provide the necessary information
								to complete your purchase.
							</DialogDescription>
						</DialogHeader>
						<div className="space-y-4 pt-4">
							<div className="border rounded-lg p-4 bg-gray-50">
								<h3 className="font-semibold text-lg mb-3">Order Summary</h3>
								<div className="space-y-3">
									<div className="flex justify-between items-start">
										<div className="space-y-1">
											<p className="font-medium">{product.name}</p>
											<p className="text-sm text-gray-600">Quantity: {count}</p>
										</div>
										<span className="font-medium">
											₱{(product.price * count).toFixed(2)}
										</span>
									</div>
									<div className="border-t pt-2 mt-2">
										<div className="flex justify-between items-center font-semibold">
											<span>Total</span>
											<span>₱{(product.price * count).toFixed(2)}</span>
										</div>
									</div>
								</div>
							</div>

							{!user && (
								<>
									<div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg border">
										You are ordering as a guest. Please provide your contact
										details to complete the order.
									</div>
									<div className="space-y-3">
										<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
											<div className="space-y-2.5">
												<Label
													htmlFor="firstName"
													className="text-sm font-medium"
												>
													First Name
												</Label>
												<Input
													id="firstName"
													type="text"
													placeholder="John"
													onChange={(e) => setFirstName(e.target.value)}
													className="h-11 px-4 border-gray-200"
												/>
											</div>
											<div className="space-y-2.5">
												<Label
													htmlFor="lastName"
													className="text-sm font-medium"
												>
													Last Name
												</Label>
												<Input
													id="lastName"
													type="text"
													placeholder="Doe"
													onChange={(e) => setLastName(e.target.value)}
													className="h-11 px-4 border-gray-200"
												/>
											</div>
										</div>
										<div className="space-y-2.5">
											<Label htmlFor="email" className="text-sm font-medium">
												Email Address
											</Label>
											<Input
												id="email"
												type="email"
												placeholder="you@example.com"
												onChange={(e) => setGuestEmail(e.target.value)}
												className="h-11 px-4 border-gray-200 "
											/>
										</div>
										<div className="space-y-2.5">
											<Label htmlFor="phone" className="text-sm font-medium">
												Phone Number
											</Label>
											<Input
												id="phone"
												type="tel"
												placeholder="+63 (955) 000-0000"
												onChange={(e) => setGuestPhone(e.target.value)}
												className="h-11 px-4 border-gray-200 "
											/>
										</div>
									</div>
								</>
							)}
							<Button
								className="w-full mt-4 bg-primary-400 hover:bg-primary/80"
								onClick={() =>
									handleCreateOrder({ itemId: product.id, quantity: count })
								}
								disabled={isCreatingOrder || isCreatingOrderAsGuest}
							>
								Confirm Order
							</Button>
						</div>
					</DialogContent>
				</Dialog>

				<Dialog
					open={isVerificationModalOpen}
					onOpenChange={setIsVerificationModalOpen}
				>
					<DialogContent className="max-w-[425px]">
						<DialogHeader>
							<DialogTitle>Verify Your Order</DialogTitle>
							<DialogDescription>
								Please enter the verification code sent to your email address.
							</DialogDescription>
						</DialogHeader>
						<div className="space-y-4 pt-4">
							<div className="space-y-2.5">
								<Label
									htmlFor="verificationCode"
									className="text-sm font-medium"
								>
									Verification Code
								</Label>
								<Input
									id="verificationCode"
									type="text"
									placeholder="Enter code"
									value={verificationCode}
									onChange={(e) => setVerificationCode(e.target.value)}
									className="h-11 px-4 border-gray-200"
								/>
							</div>
							<div className="flex gap-3">
								<Button
									className="flex-1 bg-teal-500 hover:bg-teal-600"
									onClick={async () => {
										await confirmOrder({
											orderCode: verificationCode.toString(),
										});
									}}
									disabled={isConfirmingOrder}
								>
									Verify Order
								</Button>
								<Button
									variant="destructive"
									className="flex-1"
									onClick={handleCancelOrder}
									disabled={isUpdatingOrder}
								>
									Cancel Order
								</Button>
							</div>
						</div>
					</DialogContent>
				</Dialog>
			</div>
		</div>
	);
};

export default ProductDetails;
