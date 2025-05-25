import { prismadb } from "@/lib/prisma";

export const getContactCount = async () => {
  const data = await prismadb.contact.count();
  return data;
};
