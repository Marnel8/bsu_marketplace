"use client";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../ui/card";
import Image from "next/image";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSignIn } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { toast, useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";
import Link from "next/link";

const signInSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
});

const SignInForm = () => {
	const router = useRouter();
	const {
		mutateAsync: login,
		isPending: isLoginPending,
		isSuccess: isLoginSuccess,
		isError: isLoginError,
		error: loginError,
	} = useSignIn();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
		setError,
	} = useForm<z.infer<typeof signInSchema>>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (data: z.infer<typeof signInSchema>) => {
		const { email, password } = data;

		try {
			await login({ email, password });
			reset();
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (isLoginSuccess) {
			toast({
				description: "Logged in.",
			});
			router.push("/");
		} else if (isLoginError) {
			setError("root", { message: loginError.message });
			toast({
				title: "Login failed",
				description:
					loginError.message || "An unexpected error occurred during login.",
			});
		}
	}, [isLoginError, isLoginSuccess, loginError]);

	return (
		<Card>
			<CardHeader>
				<div className="flex flex-col items-center gap-5">
					<div>
						<Image
							src="/images/marketplace_logo.png"
							alt="logo"
							width={180}
							height={100}
						/>
					</div>
					<div className="space-y-1 text-center">
						<CardTitle>Sign in with your Credentials</CardTitle>
						<CardDescription>
							Enter your credentials correctly. Click Sign In when you're done.
						</CardDescription>
					</div>
				</div>
			</CardHeader>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
				<CardContent className="space-y-2">
					<div className="space-y-1">
						<Label htmlFor="email">Email</Label>
						<Input
							{...register("email")}
							id="email"
							type="email"
							placeholder="example@email.com"
						/>
						{errors.email && (
							<p className="text-sm text-red-500">{errors.email.message}</p>
						)}
					</div>
					<div className="space-y-1">
						<Label htmlFor="pass">Password</Label>
						<Input {...register("password")} id="pass" type="password" />
						{errors.password && (
							<p className="text-sm text-red-500">{errors.password.message}</p>
						)}
					</div>
					{errors.root && (
						<div className="text-sm text-red-500 pt-2">
							{errors.root.message}
						</div>
					)}
				</CardContent>
				<CardFooter>
					<div className="w-full space-y-2">
						<Button disabled={isSubmitting} type="submit" className="w-full">
							{isSubmitting ? "Signing in..." : "Sign in"}
						</Button>
						<div className="flex justify-center items-center flex-col md:flex-row md:justify-between">
							<p className="text-center text-sm text-muted-foreground">
								Don't have an account?{" "}
								<Link
									href="/auth/signup"
									className="text-blue-500 hover:underline"
								>
									Sign up
								</Link>
							</p>
							<div>
								<Link
									href="http://atlas.batstate-u.edu.ph:3072"
									className="text-blue-500 text-sm hover:underline"
								>
									Sign in as Vendor
								</Link>
							</div>
						</div>
					</div>
				</CardFooter>
			</form>
		</Card>
	);
};

export default SignInForm;
