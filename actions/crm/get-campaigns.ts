import { prismadb } from "@/lib/prisma";

export const getCampaigns = async () => {
  const data = await prismadb.campaign.findMany({});
  return data;
};
