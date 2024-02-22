import prisma from "@/lib/prisma";

interface RegisterBody {
  studentName: string;
  matricNo: string;
}

export const POST = async (req: Request) => {
  const { studentName, matricNo } = (await req.json()) as RegisterBody;
  try {
    const findStudent = await prisma.student.findUnique({
      where: {
        matric: matricNo,
      },
    });
    if (findStudent) {
      return new Response("Student already exists", { status: 404 });
    }
    if (!findStudent) {
      const createdUser = await prisma.student.create({
        data: {
          name: studentName,
          matric: matricNo,
        },
      });
      if (createdUser) {
        try {
          await prisma.studentList.create({
            data: {
              name: createdUser.name,
              matricNo: createdUser.matric,
              class: "",
              cgpa: 0,
              studentId: createdUser.matric,
              department: "",
            },
          });
        } catch (error) {
          console.log(error);
        }

        return new Response("Student created successfully", { status: 200 });
      }
      if (!createdUser) {
        return new Response("Unable to create student", { status: 500 });
      }
    }
  } catch (error) {
    return new Response("Unable to create student", { status: 500 });
  }
};

export const GET = async (req: Request) => {
  try {
    const student = await prisma.student.findMany();
    return new Response(JSON.stringify(student), { status: 200 });
  } catch (error) {
    return new Response("Failed To Get Data", { status: 500 });
  }
};
