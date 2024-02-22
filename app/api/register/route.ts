import prisma from "@/lib/prisma";
interface RegisterBody {
  fullName: string;
  email: string;
  password: string;
}
export const POST = async (req: Request) => {
  const { fullName, email, password } = (await req.json()) as RegisterBody;
  try {
    const createdUser = await prisma.user.create({
      data: {
        fullName,
        email,
        password,
      },
    });
    if (createdUser) {
      return new Response("Successfully created", { status: 200 });
    }
    if (!createdUser) {
      return new Response("Failed To Create", { status: 500 });
    }
  } catch (error) {
    return new Response("Failed To Create", { status: 500 });
  }
};


