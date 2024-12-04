import api from "../utils/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const fetchUser = async () => {
  const response = await api.get("/user/me");

  return response.data;
};

export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    retry: false,
    staleTime: Infinity,
  });
};

const signIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const response = await api.post("/user/", { email, password });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || "Login failed");
    } else if (error.request) {
      throw new Error("No response from server");
    } else {
      throw new Error("Error in login request: " + error.message);
    }
  }
};

export const useSignIn = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.user);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      localStorage.setItem("accessToken", data.accessToken);
    },
  });
};

const signOut = async () => {
  const response = await api.post("/user/logout");
  return response.data;
};

export const useSignOut = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      queryClient.setQueryData(["user"], null);
    },
  });
};

const createUser = async ({
  email,
  password,
  firstName,
  lastName,
  contactNumber,
  age,
}: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  contactNumber: string;
  age: string;
}) => {
  const response = await api.post("/user/create-user", {
    email,
    password,
    firstName,
    lastName,
    contactNumber,
    age,
  });
  return response.data;
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      queryClient.setQueryData(["activationToken"], data.activationToken);
    },
  });
};

const activateUser = async ({
  activation_token,
  activation_code,
}: {
  activation_token: string;
  activation_code: string;
}) => {
  const response = await api.post("/user/activate-user", {
    activation_token,
    activation_code,
  });
  return response.data;
};

export const useActivateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: activateUser,
  });
};

const updateUser = async ({
  id,
  firstName,
  lastName,
  contactNumber,
  age,
  email,
}: {
  id: string;
  firstName: string;
  lastName: string;
  contactNumber: string;
  age: string;
  email: string;
}) => {
  const response = await api.put(`/user/${id}`, {
    firstName,
    lastName,
    contactNumber,
    age,
    email,
  });
  return response.data;
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};

const changePassword = async ({
  oldPassword,
  newPassword,
}: {
  oldPassword: string;
  newPassword: string;
}) => {
  const response = await api.post("/user/change-password", {
    oldPassword,
    newPassword,
  });
  return response.data;
};

export const useChangePassword = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};

