import Link from "next/link";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <main className="bg-[#51aa55] h-[90vh] gap-5 flex flex-col items-center justify-center">
      <div className="bg-[#e0d6d6] rounded-md  px-4 py-5 flex flex-col gap-8">
        <div className="flex w-64 flex-col gap-2">
          <p className="text-2xl text-[#145d01] font-bold">Reset password</p>
          <p className="text-xs text-black font-light ">
            Enter your email to reset your password
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-bold text-black">Email</p>
          <input
            className="bg-[#d0c9c9] text-black py-3 px-4 text-sm rounded-md w-64"
            placeholder="hello@gmail.com"
            type="email"
          />
          <button className="w-64 bg-[#51aa55] py-3 px-4 border rounded-md">
            Reset password
          </button>
        </div>
        <Link href="/login">
          <button className="w-64 bg-[#145d01] text-sm py-3 px-4 border rounded-md">
            Return to login
          </button>
        </Link>
      </div>
    </main>
  );
};

export default page;
