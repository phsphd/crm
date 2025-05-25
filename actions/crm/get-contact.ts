import { prismadb } from "@/lib/prisma";

export const getContact = async (contactId: string) => {
  const data = await prismadb.contact.findFirst({
    where: {
      id: contactId,
    },
    include: {
      assigned_opportunities: true,
      assigned_documents: true,
      assigned_accounts: true,
    },
  });
  return data;
};
