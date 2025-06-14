import { prismadb } from "@/lib/prisma";

export const getContactsByOpportunityId = async (opportunityId: string) => {
  const data = await prismadb.contact.findMany({
    where: {
      assigned_opportunities: {
        some: {
          id: opportunityId,
        },
      },
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
