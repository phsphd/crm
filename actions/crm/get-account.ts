import { prismadb } from "@/lib/prisma";

export const getAccount = async (accountId: string) => {
  const data = await prismadb.company.findFirst({
    where: {
      id: accountId,
    },
    include: {
      contacts: true,
      opportunities: true,
      assigned_documents: true,
      invoices: true,
      assigned_to_user: {
        select: {
          name: true,
        },
      },
    },
  });
  return data;
};
