import { handleApiError } from "@/utils/handleApiError";
import api from "../utils/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const fetchOrdersByUser = async () => {
	try {
		const response = await api.get("/order/get-user-orders");
		return response.data;
	} catch (error: any) {
		handleApiError(error);
	}
};

export const useOrders = () => {
	return useQuery({
		queryKey: ["orders"],
		queryFn: fetchOrdersByUser,
	});
};

const createOrder = async ({
	itemId,
	quantity,
}: {
	itemId: string;
	quantity: number;
}) => {
	try {
		const response = await api.post("/order", { itemId, quantity });
		return response.data;
	} catch (error: any) {
		handleApiError(error);
	}
};

export const useCreateOrder = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: createOrder,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["orders"] });
		},
	});
};

export const confirmOrder = async ({ orderCode }: { orderCode: string }) => {
	try {
		const response = await api.put(`/order/confirm-order`, { orderCode });
		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

export const useConfirmOrder = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: confirmOrder,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["orders"] });
		},
	});
};

const createOrderAsGuest = async ({
	itemId,
	quantity,
	firstName,
	lastName,
	userEmail,
	contactNumber,
}: {
	itemId: string;
	quantity: number;
	firstName: string;
	lastName: string;
	userEmail: string;
	contactNumber: string;
}) => {
	try {
		const response = await api.post("/order/create-order-as-guest", {
			itemId,
			quantity,
			firstName,
			lastName,
			userEmail,
			contactNumber,
		});
		return response.data;
	} catch (error: any) {
		handleApiError(error);
	}
};

export const useCreateOrderAsGuest = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: createOrderAsGuest,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["orders"] });
		},
	});
};

const updateOrder = async ({
	orderId,
	status,
}: {
	orderId: string;
	status: string;
}) => {
	try {
		const response = await api.put(`/order/${orderId}`, { status });
		return response.data;
	} catch (error: any) {
		handleApiError(error);
	}
};

export const useUpdateOrder = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: updateOrder,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["orders"] });
		},
	});
};
