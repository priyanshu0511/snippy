"use client";

import useAuthUser from "@/hooks/useAuthUser";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { authData, isLoading } = useAuthUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !authData) {
      router.push("/login");
    }
  }, [authData, router]);

  if (!authData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      Hello World!
          </div>
  );
}
