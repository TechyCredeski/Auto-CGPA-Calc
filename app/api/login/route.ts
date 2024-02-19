import prisma from "@/lib/prisma";;
interface RegisterBody {
  fullName: string;
  email: string;
  password: string;
}
export const POST = async (req: Request) => {
  const { email , password } = (await req.json()) as RegisterBody;
  try {
    await prisma.user.findUnique({

        where: {
          email,
        },
      });
  } catch (error) {
    return new Response("Unable to login", { status: 500 }); 
  }
  
};
