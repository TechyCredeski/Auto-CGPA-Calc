import prisma from "@/lib/prisma";

export type Props = {
  params: {
    id: string;
  };
};

export const GET = async (req: Request, { params: { id } }: Props) => {
  try {
    const getStudent = await prisma.studentList.findUnique({
      where: {
        studentId: id.replace(/&/g, "/"),
      },
    });
    if (!getStudent) {
      return new Response("not found", { status: 404 });
    }
    return new Response(JSON.stringify(getStudent), { status: 200 });
  } catch (error) {
    return new Response("unknown error", { status: 500 });
  }
};
