import { prismadb } from "@/lib/prisma";

export const getBoardSections = async (boadId: string) => {
  const data = await prismadb.section.findMany({
    where: {
      board: boadId,
    },
  });

  return data;
};
