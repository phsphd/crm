import { prismadb } from "@/lib/prisma";

export const getContractsCount = async () => {
  const data = await prismadb.contract.count();
  return data;
};
