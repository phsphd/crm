import { prismadb } from "@/lib/prisma";

export const getSalesType = async () => {
  const data = await prismadb.opportunityType.findMany({});
  return data;
};
