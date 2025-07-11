import { prismadb } from "@/lib/prisma";

export const getContacts = async () => {
  const data = await prismadb.contact.findMany({
    include: {
      assigned_to_user: {
        select: {
          name: true,
        },
      },
      user: {
        select: {
          name: true,
        },
      },
      assigned_accounts: true,
    },
  });
  return data;
};
