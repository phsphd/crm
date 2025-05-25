import { NextResponse } from "next/server";
import { prismadb } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import sendEmail from "@/lib/sendmail";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse("Unauthenticated", { status: 401 });
  }
  try {
    const body = await req.json();
    const userId = session.user.id;

    if (!body) {
      return new NextResponse("No form data", { status: 400 });
    }

    const {
      account,
      assigned_to,
      budget,
      campaign,
      close_date,
      contact,
      currency,
      description,
      expected_revenue,
      name,
      next_step,
      sales_stage,
      type,
    } = body;

    //console.log(req.body, "req.body");

    const newOpportunity = await prismadb.opportunity.create({
      data: {
        account: account,
        assigned_to: assigned_to,
        budget: Number(budget),
        campaign: campaign,
        close_date: close_date,
        contact: contact,
        created_by: userId,
        last_activity_by: userId,
        updatedBy: userId,
        currency: currency,
        description: description,
        expected_revenue: Number(expected_revenue),
        name: name,
        next_step: next_step,
        sales_stage: sales_stage,
        status: "ACTIVE",
        type: type,
      },
    });

    if (assigned_to !== userId) {
      const notifyRecipient = await prismadb.user.findFirst({
        where: {
          id: assigned_to,
        },
      });

      if (!notifyRecipient) {
        return new NextResponse("No user found", { status: 400 });
      }

      await sendEmail({
        from: process.env.EMAIL_FROM as string,
        to: notifyRecipient.email || "info@softbase.cz",
        subject:
          notifyRecipient.userLanguage === "en"
            ? `New opportunity ${name} has been added to the system and assigned to you.`
            : `Nová příležitost ${name} byla přidána do systému a přidělena vám.`,
        text:
          notifyRecipient.userLanguage === "en"
            ? `New opportunity ${name} has been added to the system and assigned to you. You can click here for detail: ${process.env.NEXT_PUBLIC_APP_URL}/crm/opportunities/${newOpportunity.id}`
            : `Nová příležitost ${name} byla přidána do systému a přidělena vám. Detaily naleznete zde: ${process.env.NEXT_PUBLIC_APP_URL}/crm/opportunities/${newOpportunity.id}`,
      });
    }

    return NextResponse.json({ newOpportunity }, { status: 200 });
  } catch (error) {
    console.log("[NEW_OPPORTUNITY_POST]", error);
    return new NextResponse("Initial error", { status: 500 });
  }
}
export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse("Unauthenticated", { status: 401 });
  }
  try {
    const body = await req.json();
    const userId = session.user.id;

    if (!body) {
      return new NextResponse("No form data", { status: 400 });
    }

    const {
      id,
      account,
      assigned_to,
      budget,
      campaign,
      close_date,
      contact,
      currency,
      description,
      expected_revenue,
      name,
      next_step,
      sales_stage,
      type,
    } = body;

    //console.log(req.body, "req.body");

    const updatedOpportunity = await prismadb.opportunity.update({
      where: { id },
      data: {
        account: account,
        assigned_to: assigned_to,
        budget: Number(budget),
        campaign: campaign,
        close_date: close_date,
        contact: contact,
        updatedBy: userId,
        currency: currency,
        description: description,
        expected_revenue: Number(expected_revenue),
        name: name,
        next_step: next_step,
        sales_stage: sales_stage,
        status: "ACTIVE",
        type: type,
      },
    });

    /* if (assigned_to !== userId) {
      const notifyRecipient = await prismadb.user.findFirst({
        where: {
          id: assigned_to,
        },
      });

      if (!notifyRecipient) {
        return new NextResponse("No user found", { status: 400 });
      }

      await sendEmail({
        from: process.env.EMAIL_FROM as string,
        to: notifyRecipient.email || "info@softbase.cz",
        subject:
          notifyRecipient.userLanguage === "en"
            ? `New opportunity ${name} has been added to the system and assigned to you.`
            : `Nová příležitost ${name} byla přidána do systému a přidělena vám.`,
        text:
          notifyRecipient.userLanguage === "en"
            ? `New opportunity ${name} has been added to the system and assigned to you. You can click here for detail: ${process.env.NEXT_PUBLIC_APP_URL}/crm/opportunities/${newOpportunity.id}`
            : `Nová příležitost ${name} byla přidána do systému a přidělena vám. Detaily naleznete zde: ${process.env.NEXT_PUBLIC_APP_URL}/crm/opportunities/${newOpportunity.id}`,
      });
    } */

    return NextResponse.json({ updatedOpportunity }, { status: 200 });
  } catch (error) {
    console.log("[UPDATED_OPPORTUNITY_PUT]", error);
    return new NextResponse("Initial error", { status: 500 });
  }
}

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse("Unauthenticated", { status: 401 });
  }

  try {
    const users = await prismadb.user.findMany({});
    const accounts = await prismadb.company.findMany({});
    const contacts = await prismadb.contact.findMany({});
    const saleTypes = await prismadb.opportunityType.findMany({});
    const saleStages = await prismadb.salesStage.findMany(
      {}
    );
    const campaigns = await prismadb.campaign.findMany({});
    const industries = await prismadb.industryType.findMany({});

    const data = {
      users,
      accounts,
      contacts,
      saleTypes,
      saleStages,
      campaigns,
      industries,
    };

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log("[GET_OPPORTUNITIES]", error);
    return new NextResponse("Initial error", { status: 500 });
  }
}
