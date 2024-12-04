import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    itemId: string;
    quantity: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
  }) => void;
  product: any;
  quantity: number;
  isAuthenticated: boolean;
  isPending?: boolean;
}

const OrderModal = ({
  isOpen,
  onClose,
  onSubmit,
  product,
  quantity,
  isAuthenticated,
  isPending,
}: OrderModalProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] w-full md:max-w-[425px] max-h-[90vh] overflow-y-auto scrollbar-hide">
        <DialogHeader>
          <DialogTitle>Complete Your Order</DialogTitle>
          <DialogDescription>
            Please review your order and provide the necessary information
            to complete your purchase.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <div className="border rounded-lg p-4 bg-gray-50">
            <h3 className="font-semibold text-lg mb-3">Order Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-gray-600">Quantity: {quantity}</p>
                </div>
                <span className="font-medium">
                  ₱{(product.price * quantity).toFixed(2)}
                </span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between items-center font-semibold">
                  <span>Total</span>
                  <span>₱{(product.price * quantity).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {!isAuthenticated && (
            <>
              <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg border">
                You are ordering as a guest. Please provide your contact
                details to complete the order.
              </div>
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-2.5">
                    <Label htmlFor="firstName" className="text-sm font-medium">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="John"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="h-11 px-4 border-gray-200"
                    />
                  </div>
                  <div className="space-y-2.5">
                    <Label htmlFor="lastName" className="text-sm font-medium">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Doe"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="h-11 px-4 border-gray-200"
                    />
                  </div>
                </div>
                <div className="space-y-2.5">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11 px-4 border-gray-200"
                  />
                </div>
                <div className="space-y-2.5">
                  <Label htmlFor="phone" className="text-sm font-medium">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+63 (955) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="h-11 px-4 border-gray-200"
                  />
                </div>
              </div>
            </>
          )}
          <Button
            className="w-full mt-4 bg-primary-400 hover:bg-primary/80"
            onClick={() =>
              onSubmit({
                itemId: product.id,
                quantity,
                firstName,
                lastName,
                email,
                phone,
              })
            }
            disabled={isPending}
          >
            Confirm Order
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderModal; 