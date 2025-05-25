import { prismadb } from "@/lib/prisma";

export const getAccountsTasks = async (accountId: string) => {  
  const data = await prismadb.task.findMany({
    where: {
      accountId: accountId,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
      account: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  return data;
};