import { Resend } from "resend";
import { prismadb } from "./prisma";

export default async function resendHelper() {
  const resendKey = await prismadb.systemService.findFirst({
    where: {
      name: "resend_smtp",
    },
  });

  const resend = new Resend(
    process.env.RESEND_API_KEY || resendKey?.value!
  );

  return resend;
}
