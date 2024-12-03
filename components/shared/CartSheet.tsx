import { useUser } from "@/hooks/useAuth";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { HiMiniShoppingBag, HiMiniTrash } from "react-icons/hi2";
import { useCartItems, useRemoveFromCart } from "@/hooks/useCart";
import { useEffect } from "react";
import { toast } from "@/hooks/use-toast";

const CartSheet = () => {
  const { data: user } = useUser();
  const { data: cartItems } = useCartItems();
  const { mutateAsync: removeFromCart, isSuccess: isRemovedFromCart } =
    useRemoveFromCart();

  useEffect(() => {
    if (isRemovedFromCart) {
      toast({
        title: "Item removed from cart",
        description: "You can now view your cart in the sidebar",
      });
    }
  }, [isRemovedFromCart]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          disabled={!user}
          className="relative p-2.5 rounded-full hover:bg-teal-50/80 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <HiMiniShoppingBag
            className="text-teal-600 transition-colors duration-300"
            size={28}
          />
          {cartItems?.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center transform transition-transform duration-300 hover:scale-110 shadow-md">
              {cartItems?.reduce(
                (acc: number, item: any) => acc + item.quantity,
                0
              )}
            </span>
          )}
        </button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-[450px] bg-gradient-to-br from-white via-white to-teal-50/30"
      >
        <SheetHeader className="pb-8 border-b border-gray-100">
          <SheetTitle className="text-2xl font-bold text-center text-gray-800">
            Your Shopping Cart
            <span className="block text-sm font-normal text-gray-500 mt-1">
              {cartItems?.length || 0} items in cart
            </span>
          </SheetTitle>
        </SheetHeader>

        <div className="mt-10 flex flex-col gap-6">
          {cartItems?.map((item: any) => (
            <div
              key={item.id}
              className="flex flex-col gap-3 rounded-xl border border-gray-100/80 p-4 bg-white shadow-sm hover:shadow-md transition-all duration-300 relative group"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="font-medium text-base text-gray-800 leading-snug">
                    {item?.item?.name}
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-teal-50/50 rounded-full text-sm font-medium text-teal-700">
                      Qty: {item?.quantity}
                    </span>
                    <span className="text-sm font-medium text-gray-500">
                      ₱{Number(item?.item?.price).toLocaleString()}.00 each
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <p className="font-bold text-base text-teal-600 min-w-[80px] text-right">
                    ₱
                    {Number(
                      item?.item?.price * item?.quantity
                    ).toLocaleString()}
                  </p>
                  <button
                    onClick={async () => await removeFromCart(item.item.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors duration-300 p-2 hover:bg-red-50 rounded-full opacity-0 group-hover:opacity-100"
                  >
                    <HiMiniTrash size={18} />
                  </button>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white py-2.5 px-4 rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all duration-300 font-medium shadow-sm hover:shadow-md active:scale-[0.98]">
                Order Now
              </button>
            </div>
          ))}

          <div className="mt-auto pt-8 border-t border-gray-200">
            <div className="flex justify-between items-center mb-8">
              <p className="text-xl font-bold text-gray-800">Total Amount</p>
              <p className="text-2xl font-bold text-teal-600">
                ₱
                {cartItems
                  ? Number(
                      cartItems?.reduce(
                        (acc: number, item: any) =>
                          acc + item?.item?.price * item?.quantity,
                        0
                      )
                    ).toLocaleString()
                  : "0.00"}
              </p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
