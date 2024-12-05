"use client";
import React, { use } from "react";
import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Label } from "../ui/label";
import Image from "next/image";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast, useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";
import { useActivateUser, useCreateUser } from "@/hooks/useAuth";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const signUpSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  age: z.string().min(1),
  contactNumber: z.string().min(10),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
});

const SignUpForm = () => {
  const {
    mutateAsync: createUser,
    isPending: isCreateUserPending,
    isSuccess: isCreateUserSuccess,
    isError: isCreateUserError,
  } = useCreateUser();

  const router = useRouter();

  const {
    mutateAsync: verifyOtp,
    isSuccess: isVerifyOtpSuccess,
    isPending: isVerifyOtpPending,
  } = useActivateUser();

  const queryClient = useQueryClient();

  const activationToken = queryClient.getQueryData(["activationToken"]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      age: "",
      contactNumber: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [isOtpDialogOpen, setIsOtpDialogOpen] = React.useState(false);
  const [otpValue, setOtpValue] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  useEffect(() => {
    if (isCreateUserSuccess) {
      setIsOtpDialogOpen(true);
    }
  }, [isCreateUserSuccess]);

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    try {
      setErrorMessage(null);
      await createUser(data);
      reset();
    } catch (error: any) {
      const message = error.response?.data?.message || 'Something went wrong during sign up';
      setErrorMessage(message);
      console.error('Signup failed:', error);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      await verifyOtp({
        activation_token: activationToken as string,
        activation_code: otpValue,
      });
      toast({
        title: "Success",
        description: "Account verified successfully",
      });
      setIsOtpDialogOpen(false);
      reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid OTP. Please try again",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (isVerifyOtpSuccess) {
      router.push("/auth");
    }
  }, [isVerifyOtpSuccess]);

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div>
              <Image src="/images/logo.png" alt="logo" width={50} height={50} />
            </div>
            <div className="space-y-1">
              <CardTitle>Sign up with your Credentials</CardTitle>
              <CardDescription>
                Enter your credentials correctly. Click Sign Up when you're
                done.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        {errorMessage && (
          <div className="px-6 py-2">
            <p className="text-red-500 text-sm">{errorMessage}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="fn">First Name</Label>
                <Input id="fn" type="text" {...register("firstName")} />
                {errors.firstName && (
                  <p className="text-red-500">{errors.firstName.message}</p>
                )}
              </div>
              <div className="space-y-1">
                <Label htmlFor="ln">Last Name</Label>
                <Input id="ln" type="text" {...register("lastName")} />
                {errors.lastName && (
                  <p className="text-red-500">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="age">Age</Label>
                <Input id="age" type="number" {...register("age")} />
                {errors.age && (
                  <p className="text-red-500">{errors.age.message}</p>
                )}
              </div>
              <div className="space-y-1">
                <Label htmlFor="cn">Contact Number</Label>
                <Input id="cn" type="text" {...register("contactNumber")} />
                {errors.contactNumber && (
                  <p className="text-red-500">{errors.contactNumber.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register("email")} />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="pass">Password</Label>
              <Input id="pass" type="password" {...register("password")} />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="cpass">Confirm Password</Label>
              <Input
                id="cpass"
                type="password"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isCreateUserPending ? "Signing up..." : "Sign up"}
            </Button>
          </CardFooter>
        </form>
      </Card>
      <Dialog 
        open={isOtpDialogOpen} 
        onOpenChange={setIsOtpDialogOpen}
        modal={true}
      >
        <DialogContent className="sm:max-w-md" onPointerDownOutside={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle className="text-center">Enter OTP</DialogTitle>
            <DialogDescription className="text-center">
              Enter the OTP sent to your email to activate your account.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center space-y-4">
            <InputOTP
              maxLength={6}
              value={otpValue}
              onChange={setOtpValue}
              className="gap-2 w-full justify-center"
            >
              <InputOTPGroup className="gap-2">
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                </InputOTPGroup>
              </InputOTPGroup>
            </InputOTP>
            <div className="flex w-full gap-2">
              <Button
                onClick={handleVerifyOtp}
                disabled={otpValue.length !== 4}
                className="w-full"
              >
                {isVerifyOtpPending ? "Verifying OTP..." : "Verify OTP"}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setIsOtpDialogOpen(false)}
                className="w-full"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SignUpForm;
