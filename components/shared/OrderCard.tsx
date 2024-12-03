import React, { useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { getImageUrl } from "@/utils/imageUtils";
import Image from "next/image";
import { AspectRatio } from "../ui/aspect-ratio";
import { useUpdateOrder } from "@/hooks/useOrders";
import { toast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

const OrderCard = ({ order }: { order: any }) => {
  const {
    mutateAsync: cancelOrder,
    isPending: isCancelOrderPending,
    isSuccess: isCancelOrderSuccess,
  } = useUpdateOrder();

  const handleCancelOrder = async () => {
    await cancelOrder({ orderId: order.id, status: "cancelled" });
  };

  useEffect(() => {
    if (isCancelOrderSuccess) {
      toast({
        title: "Order cancelled",
        description: "Your order has been cancelled",
      });
    }
  }, [isCancelOrderSuccess]);

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-400">Order ID</p>
            <p className="text-md font-bold">{order.id.slice(-8)}</p>
          </div>
          <div>
            <Badge
              variant="outline"
              className=" text-teal-500 border-teal-500 rounded-full px-3 py-1 capitalize"
            >
              {order.status}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <Card className="w-full p-2 flex gap-2">
          <div className="h-[100px] w-[100px] rounded-md bg-gray-100">
            <AspectRatio ratio={1}>
              <Image
                src={getImageUrl(order?.item?.thumbnail)}
                alt={order?.item?.name}
                fill
                className="object-cover rounded-md"
              />
            </AspectRatio>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm text-gray-400 capitalize">
              {order?.item?.category}
            </p>
            <p className="text-md font-bold">{order?.item?.name}</p>
            <p className="text-sm text-gray-400">{order?.quantity} item/s</p>
            <p className="text-md text-black">₱{order?.item?.price}.00</p>
          </div>
        </Card>
      </CardContent>
      <CardFooter className="bg-gray-100 p-4 flex justify-between items-center">
        <p className="text-md font-bold">Total: ₱{order?.totalPrice}.00</p>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="destructive"
              className="rounded-full"
              disabled={isCancelOrderPending || order.status === "approved"}
            >
              Cancel Order
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently cancel your
                order.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>No, keep my order</AlertDialogCancel>
              <AlertDialogAction onClick={handleCancelOrder}>
                Yes, cancel order
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};

export default OrderCard;
