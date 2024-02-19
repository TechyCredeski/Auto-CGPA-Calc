"use client"
import Link from "next/link";
import React, { FormEvent, FormEventHandler } from "react";

type Props = {};

const page = (props: Props) => {

  const handleSubmit = (event:FormEvent<HTMLFormElement>) => {
    
  }
  return (
    <main className="bg-[#51aa55] h-[90vh] gap-5 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">Welcome Back</h1>
      <form onSubmit={handleSubmit} className="bg-[#e0d6d6] items-center px-3 py-4 rounded-lg flex flex-col gap-3">
        <p className="text-2xl font-bold text-[#145d01]">Sign in</p>
        <input
          className="bg-[#d0c9c9] text-sm px-4 py-3 text-white rounded-md w-64"
          placeholder="Email"
          type="email"
        />
        <input
          className="bg-[#d0c9c9] py-3 px-4 text-sm rounded-md w-64"
          placeholder="Password"
          type="Password"
        />
        <p className="text-[#51aa55] ">Forgot Password?</p>
        <button className="w-64 bg-[#51aa55] py-3 px-4 border rounded-md">
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

export default page;
