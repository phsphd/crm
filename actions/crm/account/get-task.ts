import { prismadb } from "@/lib/prisma";

export const getCrMTask = async (taskId: string) => {
  const data = await prismadb.task.findFirst({  // ✅ Fixed: was crm_Accounts_Tasks
    where: {
      id: taskId,
    },
    include: {
      user: {  // ✅ Fixed: was assigned_user
        select: {
          id: true,
          name: true,
        },
      },
      documents: {
        select: {
          id: true,
          document_name: true,
          document_file_url: true,
        },
      },
      comments: {
        select: {
          id: true,
          comment: true,
          createdAt: true,
          assigned_user: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
        },
      },
    },
  });
  return data;
};