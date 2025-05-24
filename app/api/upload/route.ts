import { NextRequest, NextResponse } from "next/server";
import { s3Client } from "@/lib/digital-ocean-s3";
import { PutObjectAclCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { prismadb } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import axios from "axios";
import { getRossumToken } from "@/lib/get-rossum-token";

const FormData = require("form-data");

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  const data = await request.formData();
  const file: File | null = data.get("file") as unknown as File;

  if (!file) {
    console.log("Error - no file found");
    return NextResponse.json({ success: false });
  }
  console.log("FIle from UPLOAD API:", file);
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  console.log("Buffer:", buffer);

  //Rossum integration
  const rossumURL = process.env.ROSSUM_API_URL;
  const queueId = process.env.ROSSUM_QUEUE_ID;
  const queueUploadUrl = `${rossumURL}/uploads?queue=${queueId}`;
  const token = await getRossumToken();

  const form = new FormData();
  form.append("content", buffer, file.name);

  console.log("FORM DATA:", form);

  const uploadInvoiceToRossum = await axios.post(queueUploadUrl, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("Response", uploadInvoiceToRossum.data);

  const rossumTask = await axios.get(uploadInvoiceToRossum.data.url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("Rossum task: ", rossumTask.data);

  const rossumUploadData = await axios.get(rossumTask.data.content.upload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("Rossum upload data: ", rossumUploadData.data);

  const rossumDocument = await axios.get(rossumUploadData.data.documents[0], {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (rossumDocument.status !== 200) {
    throw new Error("Could not get Rossum document");
  }

  console.log("Rossum document: ", rossumDocument.data);

  const invoiceFileName = "invoices/" + new Date().getTime() + "-" + file.name;
  console.log("Invoice File Name:", invoiceFileName);

  console.log("UPloading to S3(Digital Ocean)...", invoiceFileName);
  try {
    const bucketParams = {
      Bucket: process.env.DO_BUCKET,
      Key: invoiceFileName,
      Body: buffer,
      ContentType: file.type,
      ContentDisposition: "inline",
      ACL: "public-read" as const,
    };

    await s3Client.send(new PutObjectCommand(bucketParams));
  } catch (err) {
    console.log("Error - uploading to S3(Digital Ocean)", err);
  }

  console.log("Creating Item in DB...");
  try {
    //S3 bucket url for the invoice
    const url = `https://${process.env.DO_BUCKET}.${process.env.DO_REGION}.digitaloceanspaces.com/${invoiceFileName}`;
    console.log("URL in Digital Ocean:", url);

    const rossumAnnotationId = rossumDocument.data.annotations[0]
      .split("/")
      .pop();

    console.log("Annotation ID:", rossumAnnotationId);
    //Save the data to the database

    await prismadb.invoices.create({
      data: {
        last_updated_by: session.user.id,
        date_due: new Date(),
        description: "Incoming invoice",
        document_type: "invoice",
        invoice_type: "Taxable document",
        status: "new",
        favorite: false,
        assigned_user_id: session.user.id,
        invoice_file_url: url,
        invoice_file_mimeType: file.type,
        rossum_status: "importing",
        rossum_document_url: rossumDocument.data.annotations[0],
        rossum_document_id: rossumDocument.data.id.toString(),
        rossum_annotation_url: rossumDocument.data.annotations[0],
        rossum_annotation_id: rossumAnnotationId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log("Error - storing data to DB", error);
    return NextResponse.json({ success: false });
  }
}
