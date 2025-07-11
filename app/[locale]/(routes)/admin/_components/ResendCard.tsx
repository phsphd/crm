import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { z } from "zod";

import { prismadb } from "@/lib/prisma";

import { revalidatePath } from "next/cache";
import { Input } from "@/components/ui/input";
import CopyKeyComponent from "./copy-key";

const ResendCard = async () => {
  const setSMTP = async (formData: FormData) => {
    "use server";
    const schema = z.object({
      id: z.string(),
      value: z.string(),
    });
    const parsed = schema.parse({
      id: formData.get("id"),
      value: formData.get("value"),
    });

    //console.log(parsed.id, "id");
    //console.log(parsed.value, "value");

    if (!parsed.id) {
      await prismadb.systemService.create({
        data: {
          v: 0,
          name: "resend_smtp",
          value: parsed.value,
        },
      });
      revalidatePath("/admin");
    } else {
      await prismadb.systemService.update({
        where: {
          id: parsed.id,
        },
        data: {
          value: parsed.value,
        },
      });
      revalidatePath("/admin");
    }
  };

  const resend_key = await prismadb.systemService.findFirst({
    where: {
      name: "resend_smtp",
    },
  });

  return (
    <Card className="min-w-[350px] max-w-[450px]">
      <CardHeader className="text-lg">
        <CardTitle>Resend.com - API Key</CardTitle>
        <CardDescription className="text-xs">
          <p>ENV API key:</p>
          <p>
            {process.env.RESEND_API_KEY ? (
              <CopyKeyComponent
                keyValue={process.env.RESEND_API_KEY}
                message="Resend - API Key"
              />
            ) : (
              "not enabled"
            )}
          </p>
          <p>API key from DB:</p>
          <p>
            {resend_key?.value ? (
              <CopyKeyComponent
                keyValue={resend_key?.value}
                message="Resend - API Key"
              />
            ) : (
              "not enabled"
            )}
          </p>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <form action={setSMTP}>
          <div>
            <input type="hidden" name="id" value={resend_key?.id} />
            <Input type="text" name="value" placeholder="Your API key" />
          </div>
          <div className="flex justify-end pt-2 gap-2">
            <Button type={"reset"}>Reset</Button>
            <Button type="submit">Set Resend key</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ResendCard;
