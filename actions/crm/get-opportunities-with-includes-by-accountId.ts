import { prismadb } from "@/lib/prisma";

export const getOpportunitiesFullByAccountId = async (accountId: string) => {
  const data = await prismadb.opportunity.findMany({
    where: {
      companyId: accountId,
    },
    include: {
      assigned_account: {
        select: {
          name: true,
        },
      },
      assigned_sales_stage: {
        select: {
          name: true,
        },
      },
      assigned_to_user: {
        select: {
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
