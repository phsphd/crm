import { prismadb } from "@/lib/prisma";

export const getOpportunitiesCount = async () => {
  const data = await prismadb.opportunity.count();
  return data;
};
