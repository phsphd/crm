import { prismadb } from "@/lib/prisma";

export const getSaleStages = async () => {
  const data = await prismadb.salesStage.findMany({
    orderBy: {
      probability: "asc",
    },
  });
  return data;
};
