"use client";

import { login } from "@/lib/api/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

export type formDataLogin = {
  email: string;
  password: string;
};

const Login = () => {
  const [formData, setFormData] = useState<formDataLogin>({
    email: "",
    password: "",
  });

  const queryClient = useQueryClient();

  const router = useRouter();

  const {
    mutate: loginMutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      router.push("/");
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    loginMutation(formData);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-4/12">
        <div className="flex justify-center items-center gap-1.5 flex-col mb-6">
          <h1 className="text-2xl font-bold">Log in to your account</h1>
          <p className="text-sm">
            Don't have an account?{" "}
            <Link href="/signup">
              <span className=" underline">Sign Up</span>
            </Link>
          </p>
        </div>
        <form className="flex flex-col gap-4 mb-6" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label>What's your email?</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="border border-gray-500 rounded-md px-4 py-2"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col">
            <label>What's your password?</label>
            <input
              type="password"
              placeholder="Enter your email"
              className="border border-gray-500 rounded-md px-4 py-2"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
          {error && (
            <p className="text-red-500">
              {(error as any).response?.data?.message || "Something went wrong"}
            </p>
          )}

          <p className="text-sm">
            By creating an account, you agree to{" "}
            <span className="underline">Terms of use</span> and{" "}
            <span className="underline">Privacy Policy.</span>
          </p>
          <button
            disabled={isPending}
            className="w-full text-center rounded-4xl bg-gray-950 text-gray-200 px-4 py-2 cursor-pointer"
          >
            {isPending ? "Logging In..." : "LogIn"}
          </button>
        </form>
        {/* <div>
          <p className="text-center mb-2">OR continue with</p>
          <div className="flex gap-4 justify-center items-center">
            <div className="flex border px-2 py-2 justify-between w-28 cursor-pointer hover:bg-gray-200 transform duration-200">
              <Image src="/google.png" alt="Logo" width={25} height={25} />
              <p>Google</p>
            </div>
            <div className="flex border px-4 py-2 justify-between w-28 cursor-pointer hover:bg-gray-200 transform duration-200">
              <Image src="/github.png" alt="Logo" width={25} height={25} />
              <p>Github</p>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Login;
