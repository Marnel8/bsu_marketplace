import api from "../utils/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const fetchCartItems = async () => {
  const response = await api.get("/cart/get-cart-items");
  return response.data;
};

export const useCartItems = () => {
  return useQuery({
    queryKey: ["cartItems"],
    queryFn: fetchCartItems,
  });
};

export const addToCart = async ({
  itemId,
  quantity,
}: {
  itemId: string;
  quantity: number;
}) => {
  const response = await api.post("/cart/add-to-cart", { itemId, quantity });
  return response.data;
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
  const response = await api.delete(`/cart/remove-from-cart/${itemId}`);
  return response.data;
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
