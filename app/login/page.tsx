"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent, FormEventHandler, useState } from "react";
import toast from "react-hot-toast";

type Props = {};

const Page = (props: Props) => {
  const { replace } = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.status === 200) {
        replace("/dashboard");
      }
      if (response.status === 500) {
        setLoading(false);
        toast.error("Something went wrong");
      }
      if (response.status === 404) {
        setLoading(false);
        toast.error("User not found");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong");
    }
  };
  return (
    <main className="bg-[#51aa55] h-[90vh] gap-5 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">Welcome Back</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-[#e0d6d6] items-center px-3 py-4 rounded-lg flex flex-col gap-3"
      >
        <p className="text-2xl font-bold text-[#145d01]">Sign in</p>
        <input
          onChange={(e) => setEmail(e.currentTarget.value)}
          required
          className="bg-[#d0c9c9] text-sm px-4 py-3 text-black rounded-md w-64"
          placeholder="Email"
          type="email"
        />
        <input
          required
          onChange={(e) => setPassword(e.currentTarget.value)}
          className="bg-[#d0c9c9] py-3 px-4 text-black rounded-md w-64"
          placeholder="Password"
          type="Password"
        />
        <p className="text-[#51aa55] ">Forgot Password?</p>
        <button
          className={`w-64 ${
            loading ? "pointer-events-none opacity-40" : ""
          } bg-[#51aa55] py-3 px-4 border rounded-md`}
        >
          LogIn
        </button>
        <Link href="/register">
          <p className="text-xs text-black font-semibold">
            Dont have an account? <span className="italic">Create</span>
          </p>
        </Link>
      </form>
    </main>
  );
};

export default Page;
