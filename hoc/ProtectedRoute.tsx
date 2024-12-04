"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "../hooks/useAuth";
import { toast } from "@/hooks/use-toast";
// import Loader from "@/components/shared/Loader";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { data: user, isPending: isLoading, error, isError } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user && !isLoading) {
      router.push("/auth");
    }
    if (isError) {
      toast({
        title: "Please sign in.",
      });
    }
  }, [user, isLoading, isError, router]);

  if (!user && !isLoading) {
    return <p>Loading...</p>;
  }

  return <>{user && children}</>;
};

export default ProtectedRoute;
