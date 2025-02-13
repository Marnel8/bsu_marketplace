import { handleApiError } from "@/utils/handleApiError";
import api from "../utils/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const fetchCartItems = async () => {
	try {
		const response = await api.get("/cart/get-cart-items");
		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

export const useCartItems = () => {
	return useQuery({
		queryKey: ["cartItems"],
		queryFn: fetchCartItems,
		staleTime: 15000,
	});
};

export const addToCart = async ({
	itemId,
	quantity,
}: {
	itemId: string;
	quantity: number;
}) => {
	try {
		const response = await api.post("/cart/add-to-cart", { itemId, quantity });
		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

export const useAddToCart = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: addToCart,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["cartItems"] });
		},
	});
};

export const removeFromCart = async (itemId: string) => {
	try {
		const response = await api.delete(`/cart/remove-from-cart/${itemId}`);
		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

export const useRemoveFromCart = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: removeFromCart,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["cartItems"] });
		},
	});
};
