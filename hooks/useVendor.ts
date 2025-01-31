import api from "../utils/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export interface VendorRegistration {
	businessName: string;
	businessType: string;
	businessDescription: string;
	businessAddress: string;
	logo?: File | string | null;
	banner?: File | string | null;
	validId?: File | string | null;
}

const registerVendor = async (data: VendorRegistration) => {
	const formData = new FormData();

	formData.append("businessName", data.businessName);
	formData.append("businessType", data.businessType);
	formData.append("businessDescription", data.businessDescription);
	formData.append("businessAddress", data.businessAddress);

	if (data.logo) {
		formData.append("logo", data.logo);
	}

	if (data.banner) {
		formData.append("banner", data.banner);
	}

	console.log(data.validId);
	if (data.validId) {
		formData.append("validID", data.validId);
	}

	try {
		const response = await api.post("/vendor/", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});

		return response.data;
	} catch (error: any) {
		if (error.response) {
			throw new Error(error.response.data.message || "Failed to create vendor");
		} else if (error.request) {
			throw new Error("No response from server");
		} else {
			throw new Error("Something went wrong");
		}
	}
};

export const useRegisterVendor = () =>
	useMutation({ mutationFn: registerVendor });
