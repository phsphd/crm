import { prismadb } from "@/lib/prisma";

export const getAccounts = async () => {
  const data = await prismadb.company.findMany({
    include: {
      assigned_to_user: {
        select: {
          name: true,
        },
      },
      contacts: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
};
