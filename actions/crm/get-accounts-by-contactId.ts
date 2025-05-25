import { prismadb } from "@/lib/prisma";

export const getAccountsByContactId = async (contactId: string) => {
  const data = await prismadb.company.findMany({
    where: {
      contacts: {
        some: {
          id: contactId,
        },
      },
    },
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
