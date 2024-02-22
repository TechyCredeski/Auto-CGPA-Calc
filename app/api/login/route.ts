import prisma from "@/lib/prisma";
interface RegisterBody {
  fullName: string;
  email: string;
  password: string;
}
export const POST = async (req: Request) => {
  const { email, password } = (await req.json()) as RegisterBody;
  try {
    const getLoggedIn = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (getLoggedIn) return new Response("Success", { status: 200 });
    if (!getLoggedIn) return new Response("User not found", { status: 404 });
  } catch (error) {
    return new Response("Unable to login", { status: 500 });
  }
};
