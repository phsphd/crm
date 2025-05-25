import { prismadb } from "@/lib/prisma";

export const getAllCrmData = async () => {
  const users = await prismadb.user.findMany({
    where: {
      userStatus: "ACTIVE",
    },
  });
  const accounts = await prismadb.company.findMany({});
  const opportunities = await prismadb.opportunity.findMany({});
  const leads = await prismadb.lead.findMany({});
  const contacts = await prismadb.contact.findMany({});
  const contracts = await prismadb.contract.findMany({});           // ✅ Already correct
  const saleTypes = await prismadb.opportunityType.findMany({});    // Changed
  const saleStages = await prismadb.salesStage.findMany({});        // Changed  
  const campaigns = await prismadb.campaign.findMany({});           // ✅ Already correct
  const industries = await prismadb.industryType.findMany({});      // Changed

  const data = {
    users,
    accounts,
    opportunities,
    leads,
    contacts,
    contracts,
    saleTypes,
    saleStages,
    campaigns,
    industries,
  };

  return data;
};
