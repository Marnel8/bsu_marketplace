"use client";
import { useEffect } from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { useSignOut } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import Link from "next/link";
const UserAvatar = ({ user }: { user: any }) => {
  const { mutateAsync: signOut, isSuccess } = useSignOut();
  const router = useRouter();
  useEffect(() => {
    if (isSuccess) {
      router.push("/");
    }
  }, [isSuccess]);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {" "}
        <Avatar className="cursor-pointer">
          <AvatarFallback>
            {user?.user?.firstName?.charAt(0)}
            {user?.user?.lastName?.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <Link href="/account">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={async () => await signOut()}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAvatar;
