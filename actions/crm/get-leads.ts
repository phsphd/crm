import { prismadb } from "@/lib/prisma";

export const getLeads = async () => {
  const data = await prismadb.lead.findMany({
    include: {
      assigned_to_user: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
};
