import prisma from "@/lib/prisma";
import { Props } from "../../getStudent/[id]/route";

interface RegisterBody {
  courseCode: string;
  courseTitle: string;
  courseUnit: number;
  grade: number;
  semester: string;
}

export const POST = async (req: Request, { params: { id } }: Props) => {
  const {
    courseCode,
    courseTitle,
    courseUnit: unit,
    grade,
    semester,
  } = (await req.json()) as RegisterBody;
  console.log(id.replace(/&/g, "/"));
  try {
    const findStudent = await prisma.studentResult.create({
      data: {
        studentId: id.replace(/&/g, "/"),
        courseCode,
        courseTitle,
        unit,
        grade,
        semester,
      },
    });
    if (findStudent) {
      return new Response("Student Result successfully added", { status: 200 });
    }
  } catch (error) {
    console.log(error);
    return new Response("Unable to create student", { status: 500 });
  }
};

export const GET = async (req: Request, { params: { id } }: Props) => {
  try {
    const student = await prisma.studentResult.findMany({
      where: {
        studentId: id.replace(/&/g, "/"),
      },
    });
    return new Response(JSON.stringify(student), { status: 200 });
  } catch (error) {
    return new Response("Failed To Get Data", { status: 500 });
  }
};

export const DELETE = async (req: Request, { params: { id } }: Props) => {

  try {
    await prisma.studentResult.delete({
      where: {
        courseCode: id,
      },
    });
    return new Response(JSON.stringify("Deleted Updated"), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify("Error deleting file"), { status: 500 });
  }
};
