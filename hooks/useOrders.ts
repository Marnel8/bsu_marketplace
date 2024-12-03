import api from "../utils/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const fetchOrdersByUser = async () => {
  const response = await api.get("/order/get-user-orders");
  return response.data;
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
  const response = await api.post("/order", { itemId, quantity });
  return response.data;
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
  const response = await api.put(`/order/confirm-order`, { orderCode });
  return response.data;
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
  const response = await api.post("/order/create-order-as-guest", {
    itemId,
    quantity,
    firstName,
    lastName,
    userEmail,
    contactNumber,
  });
  return response.data;
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

const updateOrder = async ({ orderId, status }: { orderId: string; status: string }) => {
  const response = await api.put(`/order/${orderId}`, { status });
  return response.data;
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
    
