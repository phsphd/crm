import { prismadb } from "@/lib/prisma";

export const getActiveUsersCount = async () => {
  const data = await prismadb.user.count({
    where: {
      userStatus: "ACTIVE",
    },
  });
  return data;
};
