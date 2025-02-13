"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRegisterVendor } from "@/hooks/useVendor";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

type VendorFormData = {
	companyName: string;
	address: string;
	city: string;
	state: string;
	zipCode: string;
	logo: File | null;
	banner: File | null;
	validId: File | null;
	businessDescription: string;
	businessType: string;
};

interface ComprehensiveVendorRegistrationFormProps {
	onSuccess: () => void;
}

// New interface for form data

export function ComprehensiveVendorRegistrationForm({
	onSuccess,
}: ComprehensiveVendorRegistrationFormProps) {
	const [formData, setFormData] = useState<VendorFormData>({
		companyName: "",
		businessType: "",
		address: "",
		city: "",
		state: "",
		zipCode: "",
		validId: null,
		logo: null,
		banner: null,
		businessDescription: "",
	});

	const logoInputRef = useRef<HTMLInputElement>(null);
	const bannerInputRef = useRef<HTMLInputElement>(null);
	const validIdRef = useRef<HTMLInputElement>(null);

	const { mutateAsync: createVendor, isPending: isCreateVendorPending } =
		useRegisterVendor();

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSelectChange = (name: string, value: string) => {
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0];
			setFormData((prev) => ({ ...prev, logo: file }));
		}
	};

	const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0];
			setFormData((prev) => ({ ...prev, banner: file }));
		}
	};
	const handleValidIDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0];
			setFormData((prev) => ({ ...prev, validId: file }));
		}
	};

	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const data = {
			businessName: formData.companyName,
			businessType: formData.businessType,
			businessDescription: formData.businessDescription,
			businessAddress: `${formData.address}, ${formData.city}, ${formData.state}, ${formData.zipCode}`,
			logo: formData.logo,
			banner: formData.banner,
			validId: formData.validId,
		};
		try {
			await createVendor(data);
			toast({
				title: "Registration successful",
				description: "You have successfully registered as a vendor.",
			});

			setFormData({
				companyName: "",
				businessType: "",
				address: "",
				city: "",
				state: "",
				zipCode: "",
				validId: null,
				logo: null,
				banner: null,
				businessDescription: "",
			});

			router.replace("http://atlas.batstate-u.edu.ph:3072/");
		} catch (error) {
			toast({
				variant: "destructive",
				title: "Error",
				description: error instanceof Error ? error.message : "Unknown error",
			});
		}
	};

	return (
		<ScrollArea className="max-h-[80vh] overflow-y-auto px-2 hide-scrollbar">
			<form onSubmit={handleSubmit} className="space-y-6">
				<div className="space-y-4 px-2">
					<div>
						<Label htmlFor="companyName">Company Name</Label>
						<Input
							id="companyName"
							name="companyName"
							value={formData.companyName}
							onChange={handleChange}
							required
						/>
					</div>

					<div>
						<Label htmlFor="businessType">Business Type</Label>
						<Select
							name="businessType"
							value={formData.businessType || ""}
							onValueChange={(value) =>
								handleSelectChange("businessType", value)
							}
						>
							<SelectTrigger>
								<SelectValue placeholder="Select business type" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="restaurant">Restaurant</SelectItem>
								<SelectItem value="food and beverage">
									Food and Beverage
								</SelectItem>
								<SelectItem value="grocery">Grocery</SelectItem>
								<SelectItem value="fashion">Fashion</SelectItem>
								<SelectItem value="beauty">Beauty</SelectItem>
								<SelectItem value="electronics">Electronics</SelectItem>
								<SelectItem value="home and garden">Home and Garden</SelectItem>
								<SelectItem value="other">Other</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div>
						<Label htmlFor="address">Address</Label>
						<Input
							id="address"
							name="address"
							value={formData.address || ""}
							onChange={handleChange}
							required
						/>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div>
							<Label htmlFor="city">City</Label>
							<Input
								id="city"
								name="city"
								value={formData.city || ""}
								onChange={handleChange}
								required
							/>
						</div>
						<div>
							<Label htmlFor="state">State</Label>
							<Input
								id="state"
								name="state"
								value={formData.state || ""}
								onChange={handleChange}
								required
							/>
						</div>
					</div>

					<div>
						<Label htmlFor="zipCode">ZIP Code</Label>
						<Input
							id="zipCode"
							name="zipCode"
							value={formData.zipCode || ""}
							onChange={handleChange}
							required
						/>
					</div>

					<div>
						<Label htmlFor="logo">Logo</Label>
						<Input
							id="logo"
							name="logo"
							type="file"
							accept="image/*"
							onChange={handleLogoChange}
							ref={logoInputRef}
						/>
					</div>

					<div>
						<Label htmlFor="banner">Banner</Label>
						<Input
							id="banner"
							name="banner"
							type="file"
							accept="image/*"
							onChange={handleBannerChange}
							ref={bannerInputRef}
						/>
					</div>
					<div>
						<Label htmlFor="validId">Valid ID</Label>
						<Input
							id="validId"
							name="validId"
							type="file"
							accept="image/*"
							onChange={handleValidIDChange}
							ref={validIdRef}
						/>
					</div>

					<div>
						<Label htmlFor="businessDescription">Business Description</Label>
						<Textarea
							id="businessDescription"
							name="businessDescription"
							value={formData.businessDescription || ""}
							onChange={handleChange}
							rows={4}
						/>
					</div>
				</div>

				<Button
					type="submit"
					className="w-full"
					disabled={isCreateVendorPending}
				>
					{isCreateVendorPending ? "Registering..." : "Register Vendor"}
				</Button>
			</form>
		</ScrollArea>
	);
}
