import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { prismadb } from "@/lib/prisma";
import SetGptModel from "../forms/SetGptModel";

import OnTestButton from "./OnTestButton";
import { GptModel } from "@prisma/client";

const GptCard = async () => {
  const gptModels: GptModel[] = await prismadb.GptModel.findMany();
  //console.log(gptModels, "gptModels");

  return (
    <Card className="min-w-[350px]  max-w-[450px]">
      <CardHeader className="text-lg">
        <CardTitle>AI assistant GPT model</CardTitle>
        <CardDescription className="text-xs">
          actual model:{" "}
          {
            //filter in gptModels where status = ACTIVE
            gptModels
              .filter((model: GptModel) => model.status === "ACTIVE")
              .map((model: GptModel) => model.model)
          }
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <SetGptModel models={gptModels} />
        <OnTestButton />
      </CardContent>
    </Card>
  );
};

export default GptCard;
