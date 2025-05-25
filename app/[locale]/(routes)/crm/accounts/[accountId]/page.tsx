import Container from "@/app/[locale]/(routes)/components/ui/Container";
import React from "react";
import { BasicView } from "./components/BasicView";

import { getAccount } from "@/actions/crm/get-account";
import { getAllCrmData } from "@/actions/crm/get-crm-data";
import { getOpportunitiesFullByAccountId } from "@/actions/crm/get-opportunities-with-includes-by-accountId";
import { getContactsByAccountId } from "@/actions/crm/get-contacts-by-accountId";
import { getLeadsByAccountId } from "@/actions/crm/get-leads-by-accountId";
import { getDocumentsByAccountId } from "@/actions/documents/get-documents-by-accountId";
import { getContractsByAccountId } from "@/actions/crm/get-contracts";
import { getAccountsTasks } from "@/actions/crm/account/get-tasks";

import OpportunitiesView from "../../components/OpportunitiesView";
import LeadsView from "../../components/LeadsView";
import ContactsView from "../../components/ContactsView";
import DocumentsView from "../../components/DocumentsView";

import {
  Document,        // was Documents
  Company,         // was crm_Accounts (@@map("crm_Accounts"))
  Task,            // was crm_Accounts_Tasks (@@map("crm_Accounts_Tasks"))
  Contact,         // was crm_Contacts (@@map("crm_Contacts"))
  Contract,        // was crm_Contracts (@@map("crm_Contracts"))
  Lead,            // was crm_Leads (@@map("crm_Leads"))
  Opportunity,     // was crm_Opportunities (@@map("crm_Opportunities"))
} from "@prisma/client";

import AccountsTasksView from "./components/TasksView";
import ContractsView from "../../components/ContractsView";

interface AccountDetailPageProps {
  params: Promise<{
    accountId: string;
  }>;
}

const AccountDetailPage = async (props: AccountDetailPageProps) => {
  const params = await props.params;
  const { accountId } = params;
  const account: Company | null = await getAccount(accountId);
  const opportunities: Opportunity[] =
  await getOpportunitiesFullByAccountId(accountId);
  const contacts: Contact[] = await getContactsByAccountId(accountId);
  const contracts: Contract[] = await getContractsByAccountId(accountId);
  const leads: Lead[] = await getLeadsByAccountId(accountId);
  const documents: Document[] = await getDocumentsByAccountId(accountId);
  const tasks: Task[] = await getAccountsTasks(accountId);
  const crmData = await getAllCrmData();

  if (!account) return <div>Account not found</div>;

  return (
    <Container
      title={`Account: ${account?.name}`}
      description={"Everything you need to know about sales potential"}
    >
      <div className="space-y-5">
        <BasicView data={account} />
        <AccountsTasksView data={tasks} account={account} />
        <OpportunitiesView
          data={opportunities}
          crmData={crmData}
          accountId={accountId}
        />
        <ContactsView data={contacts} crmData={crmData} accountId={accountId} />
        <ContractsView
          data={contracts}
          crmData={crmData}
          accountId={accountId}
        />
        <LeadsView data={leads} crmData={crmData} />
        <DocumentsView data={documents} />
      </div>
    </Container>
  );
};

export default AccountDetailPage;
