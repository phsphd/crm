import { prismadb } from "@/lib/prisma";

export const getAccountsByOpportunityId = async (opportunityId: string) => {
  const data = await prismadb.company.findMany({
    where: {
      opportunities: {
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
