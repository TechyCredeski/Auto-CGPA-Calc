"use client";
/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/5WJtDMAN1Ri
 */
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

interface student {
  id: string;
  matric: string;
  name: string;
}

export function StudentList() {
  const [loading, setLoading] = useState(false);
  const [matricNo, setMatricNo] = useState("");
  const [studentName, setStudentName] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [studentId, setStudentId] = useState("");

  const { data, refetch } = useQuery({
    queryKey: ["studentList"],
    queryFn: () => axios.get(`/api/addStudent`).then((res) => res.data),
  });

  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const triggerClick = () => {
    if (buttonRef.current) {
      buttonRef.current.click();
    }
  };

  const DeleteStudent = async (id: string) => {
    setDeleting(true);
    try {
      const response = await fetch(`/api/deleteStudent/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        toast.success("Successfully Deleted");
        refetch();
      }
      if (response.status === 500) {
        toast.error("Error Deleting");
      }
      setDeleting(false);
    } catch (error) {
      toast.error("Error Deleting");
      setDeleting(false);
    }
  };

  const saveStudent = async () => {
    if (studentName.length < 4) return;
    if (matricNo.length < 15) return;
    setLoading(true);
    try {
      const response = await fetch("/api/addStudent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ matricNo, studentName }),
      });
      console.log(response);
      if (response.status === 200) {
        setLoading(false);
        triggerClick();
        refetch();
        toast.success("Successfully Added student");
      }
      if (response.status === 404) {
        setLoading(false);
        toast.error("Student already exists in the database");
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
    <div className="grid h-screen w-full min-h-screen lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
        <div className="flex bg-[#51ae55] h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] px-4 items-center border-b ">
            <Link className="flex items-center gap-2 font-semibold" href="#">
              <Package2Icon className="h-6 text-white w-6" />
              <span className="text-white">CGPA Calculator</span>
            </Link>
            {/* <Button className="ml-auto h-8 w-8" size="icon" variant="outline">
              <BellIcon className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button> */}
          </div>
          <div className="flex-1 bg-[#51ae55]  overflow-auto py-2">
            <nav className="flex flex-col h-full bg-[#51ae55] text-white  px-4 text-sm font-medium">
              <Link
                className="flex items-center gap-3 rounded-lg  px-3 py-2   transition-all "
                href="/dashboard"
                passHref
              >
                <HomeIcon className="h-4 w-4" />
                Home
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg  px-3 py-2   transition-all "
                href="/classes"
                passHref
              >
                <UsersIcon className="h-4 w-4" />
                Classes
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg  px-3 py-2   transition-all "
                href="/student-page"
                passHref
              >
                <PackageIcon className="h-4 w-4" />
                Grading
              </Link>
            </nav>
          </div>
          {/* <div className="mt-auto p-4">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>Unlock all features and get unlimited access to our support team</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" size="sm">
                  Upgrade
                </Button>
              </CardContent>
            </Card>
          </div> */}
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
          <Link
            className="lg:hidden flex items-center gap-2 font-semibold"
            href="#"
          >
            <Package2Icon className="h-6 w-6" />
            <span className="sr-only">Home</span>
          </Link>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  className="w-full bg-white shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3 dark:bg-gray-950"
                  placeholder="Search students or classes..."
                  type="search"
                />
              </div>
            </form>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800"
                size="icon"
                variant="ghost"
              >
                <img
                  alt="Avatar"
                  className="rounded-full"
                  height="32"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "32/32",
                    objectFit: "cover",
                  }}
                  width="32"
                />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="flex gap-2 flex-col items-start justify-start font-bold text-black">
            <button>ND2 Fulltime</button>
            <button>Computer Science</button>
            <button>School of Technology</button>
            <div className="flex justify-between w-[100%] ">
              <button>Number of students: {data?.length}</button>
              <Dialog>
                <DialogTrigger
                  className="border py-1 font-medium px-5 rounded-md"
                  ref={buttonRef}
                >
                  Add student
                </DialogTrigger>
                <DialogContent className="text-sm">
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-12 items-center">
                      Matric No:{" "}
                      <input
                        onChange={(e) => setMatricNo(e.currentTarget.value)}
                        className="border rounded-md py-2 outline-none px-2 w-40"
                        placeholder="Enter matric number"
                      />
                    </div>
                    <div className="flex gap-4 items-center">
                      Student Name:{" "}
                      <input
                        onChange={(e) => setStudentName(e.currentTarget.value)}
                        className="border rounded-md py-2 outline-none px-2 w-40"
                        placeholder="Chukunzemeka Solomon"
                      />
                    </div>
                    <button
                      onClick={saveStudent}
                      className={`border bg-[#51aa55] px-4 py-2  rounded-md text-sm ${
                        loading ? "pointer-events-none opacity-30" : ""
                      }  text-white  font-medium`}
                    >
                      Save
                    </button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div className="border shadow-sm rounded-lg ">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px]">Matric No</TableHead>
                  <TableHead>Student Name</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.map((student: student) => (
                  <TableRow key={student.matric}>
                    <TableCell className="font-medium">
                      {student.matric}
                    </TableCell>
                    <TableCell className="font-medium">
                      {student.name}
                    </TableCell>
                    <TableCell className="flex gap-1">
                      <button className="border px-4 py-1 rounded-md text-xs">
                        <Link
                          href={`/student-page/${student.matric.replace(
                            /\//g,
                            "&"
                          )}`}
                        >
                          View
                        </Link>
                      </button>
                      {studentId === student.id ? (
                        <button
                          className={`bg-red-700 ${
                            deleting ? "pointer-events-none opacity-30" : ""
                          } text-white border px-4 py-1 rounded-md text-xs`}
                          onClick={() => {
                            DeleteStudent(student.id);
                            setStudentId(student.id);
                          }}
                          // assuming student.id exists
                        >
                          Delete
                        </button>
                      ) : (
                        <button
                          className={`bg-red-700 
                      
                           text-white border px-4 py-1 rounded-md text-xs`}
                          onClick={() => {
                            DeleteStudent(student.id), setStudentId(student.id);
                          }}
                          // assuming student.id exists
                        >
                          Delete
                        </button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </main>
      </div>
    </div>
  );
}

function Package2Icon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
      <path d="M12 3v6" />
    </svg>
  );
}

function BellIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function HomeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function UsersIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function PackageIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}

function LineChartIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 3v18h18" />
      <path d="m19 9-5 5-4-4-3 3" />
    </svg>
  );
}

function SearchIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
