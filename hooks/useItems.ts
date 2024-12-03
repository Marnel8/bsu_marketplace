import api from "../utils/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const fetchItems = async () => {
  const response = await api.get("/item/");
  return response.data;
};

export const useItems = () => {
  return useQuery({
    queryKey: ["items"],
    queryFn: fetchItems,
  });
};

export const getItemById = async (id: string) => {
  const response = await api.get(`/item/${id}`);
  return response.data;
};

export const useItemById = (id: string) => {
  return useQuery({
    queryKey: ["item", id],
    queryFn: () => getItemById(id),
    enabled: !!id,
  });
};
