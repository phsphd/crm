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

const OpenAiCard = async () => {
  const setOpenAiKey = async (formData: FormData) => {
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
          name: "openAiKey",
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

  const openAi_key = await prismadb.systemService.findFirst({
    where: {
      name: "openAiKey",
    },
  });

  return (
    <Card className="min-w-[350px]  max-w-[450px]">
      <CardHeader className="text-lg">
        <CardTitle>OpenAi - API Key</CardTitle>
        <CardDescription className="text-xs overflow-hidden">
          {/*  Here will be actual settings */}
          <p>ENV API key:</p>
          <p>
            {process.env.OPENAI_API_KEY ? (
              <CopyKeyComponent
                envValue={process.env.OPENAI_API_KEY}
                message="OpenAi - API Key"
              />
            ) : (
              "not enabled"
            )}
          </p>
          <p>API key from DB:</p>
          {openAi_key?.value ? (
            <CopyKeyComponent
              keyValue={openAi_key.value}
              message="OpenAi - API Key"
            />
          ) : (
            "not enabled"
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <form action={setOpenAiKey}>
          <div>
            <input type="hidden" name="id" value={openAi_key?.id} />
            <Input type="text" name="value" placeholder="Your API key" />
          </div>
          <div className="flex justify-end pt-2 gap-2">
            <Button type={"reset"}>Reset</Button>
            <Button type="submit">Set OpenAi key</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default OpenAiCard;
