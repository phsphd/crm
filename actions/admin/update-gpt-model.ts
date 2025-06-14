"use server";

import { prismadb } from "@/lib/prisma";

const updateModel = async (model: any) => {
  await prismadb.gptModel.updateMany({
    data: {
      status: "INACTIVE",
    },
  });

  const setCronGPT = await prismadb.gptModel.update({
    where: {
      id: model,
    },
    data: {
      status: "ACTIVE",
    },
  });
  console.log("change GPT model to:", setCronGPT);
};

export default updateModel;
