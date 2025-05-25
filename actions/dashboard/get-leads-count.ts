import { prismadb } from "@/lib/prisma";

export const getLeadsCount = async () => {
  const data = await prismadb.lead.count();
  return data;
};
