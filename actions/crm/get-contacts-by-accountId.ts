import { prismadb } from "@/lib/prisma";

export const getContactsByAccountId = async (accountId: string) => {
  const data = await prismadb.contact.findMany({
    where: {
      companyId: accountId,
    },
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
