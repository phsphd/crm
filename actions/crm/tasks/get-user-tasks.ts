import { prismadb } from "@/lib/prisma";

export const getUserCRMTasks = async (userId: string) => {
  const data = await prismadb.task.findMany({
    where: {
      user: userId,
    },
    include: {
      assigned_user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
};
