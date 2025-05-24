import { prismadb } from "@/lib/prisma";

export const getSections = async () => {
  const data = await prismadb.section.findMany({});

  return data;
};
