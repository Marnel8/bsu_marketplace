"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ComprehensiveVendorRegistrationForm } from "./VendorRegistrationForm";
import { useUser } from "@/hooks/useAuth";
import Link from "next/link";

interface VendorRegistrationDialogProps {
  trigger: React.ReactNode;
}

export function VendorRegistrationDialog({
  trigger,
}: VendorRegistrationDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { data: user } = useUser();

  return (
    <>
      {!user ? (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>{trigger}</DialogTrigger>
          <DialogContent className="bg-white shadow-lg rounded-lg p-6 sm:max-w-[425px] lg:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-gray-800">
                Authentication Required
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                To proceed with vendor registration, kindly log in to your
                account.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex justify-end">
              <Link
                href="/auth"
                className="text-blue-600 hover:underline font-medium"
              >
                Log In
              </Link>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>{trigger}</DialogTrigger>
          <DialogContent className="sm:max-w-[425px] md:max-w-[700px] lg:max-w-[900px]">
            <DialogHeader>
              <DialogTitle>Vendor Registration</DialogTitle>
              <DialogDescription>
                Fill out the form below to register as a vendor. All fields are
                required unless otherwise stated.
              </DialogDescription>
            </DialogHeader>
            <ComprehensiveVendorRegistrationForm
              onSuccess={() => setIsOpen(false)}
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
