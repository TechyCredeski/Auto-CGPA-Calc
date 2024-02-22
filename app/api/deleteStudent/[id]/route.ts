import prisma from "@/lib/prisma";

export type Props = {
  params: {
    id: string;
  };
};

export const DELETE = async (req: Request, { params: { id } }: Props) => {
  try {
    await prisma.student.delete({
      where: { id },
    });
    return new Response(JSON.stringify("Deleted Updated"), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify("Error deleting file"), { status: 500 });
  }
};
