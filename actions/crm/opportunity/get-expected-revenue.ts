import { prismadb } from "@/lib/prisma";

export const getExpectedRevenue = async () => {
  const activeOpportunities = await prismadb.opportunity.findMany({
    where: {
      status: "ACTIVE",
    },
  });

  const totalAmount = activeOpportunities.reduce(
    (sum: number, opportunity: any) => sum + Number(opportunity.budget),
    0
  );

  return totalAmount;
};
