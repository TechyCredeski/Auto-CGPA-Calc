import prisma from "@/lib/prisma";;
interface RegisterBody {
  fullName: string;
  email: string;
  password: string;
}
export const POST = async (req: Request) => {
  const { fullName , email , password } = (await req.json()) as RegisterBody;
  try {
    await prisma.profile.create({
        data: {
          fullName,
          email,
          password
        },
      });
  } catch (error) {
    return new Response("Failed To Create", { status: 500 }); 
  }
  
};
