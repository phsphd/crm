import { prismadb } from "@/lib/prisma";

export const getAccountsCount = async () => {
  const data = await prismadb.company.count();
  return data;
};
