"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

type Props = {};

const Page = (props: Props) => {
  const { replace } = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true)
    e.preventDefault();
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullName, email, password }),
      });
      if (response.status === 200) {
        replace("/login");
      }
      if (response.status === 500) {
        setLoading(false);
        toast.error("Something went wrong");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong");
    }
  };
  return (
    <main className="bg-[#51aa55] h-[90vh] gap-5 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">Welcome</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-[#e0d6d6] items-center px-3 py-4 rounded-lg flex flex-col gap-3"
      >
        <p className="text-2xl font-bold text-[#145d01]">Sign-Up</p>
        <input
          onChange={(e) => setFullName(e.currentTarget.value)}
          required
          name="fullName"
          className="bg-[#d0c9c9] text-sm px-4 py-3 text-black rounded-md w-64"
          placeholder="Full-name"
          type="text"
        />
        <input
          required
          onChange={(e) => setEmail(e.currentTarget.value)}
          name="email"
          className="bg-[#d0c9c9] text-sm px-4 py-3 text-black rounded-md w-64"
          placeholder="Email"
          type="email"
        />
        <input
          required
          onChange={(e) => setPassword(e.currentTarget.value)}
          name="password"
          className="bg-[#d0c9c9] py-3 text-black px-4 text-sm rounded-md w-64"
          placeholder="Enter Password"
          type="Password"
        />
        <button
          className={`w-64 ${
            loading ? "pointer-events-none opacity-40" : ""
          } bg-[#51aa55] py-3 px-4 border rounded-md`}
        >
          Sign-Up
        </button>
      </form>
      <p className="mt-[-20px]">Or</p>
      <Link href="/login">
        <button className="w-52 mt-[-20px]  bg-[#e0d6d6] text-black font-bold py-2 px-4 border rounded-md">
          Sign-In
        </button>
      </Link>
    </main>
  );
};

export default Page;
