// lib/r2.ts
"use server";
import { S3Client, PutObjectCommand, DeleteObjectCommand, DeleteObjectsCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { log } from "./logger";

// --- FIX: Create a function to get the client with credentials ---
// This prevents reading process.env at the top level, 
// which causes build errors in Netlify.
const getR2Client = () => {
  return new S3Client({
    region: "auto",
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID!,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    },
  });
};
// -----------------------------------------------------------------



export async function getImagesFromFolder(folderName: string) {
  try {
    const r2Client = getR2Client();

    // Pastikan prefix diakhiri dengan '/' agar R2 tahu ini adalah folder
    const prefix = folderName.endsWith('/') ? folderName : `${folderName}/`;

    const command = new ListObjectsV2Command({
      Bucket: process.env.R2_BUCKET_NAME,
      Prefix: prefix,
    });

    const response = await r2Client.send(command);

    // Filter agar nama folder itu sendiri tidak ikut masuk ke daftar
    const images = response.Contents?.filter(item => item.Key !== prefix)
      .map((item) => ({
        key: item.Key,
        url: `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${item.Key}`,
      })) || [];

    return images;
  } catch (error) {
    console.error(`Gagal mengambil gambar dari folder ${folderName}:`, error);
    return [];
  }
}

export async function getClientImages() {
  try {
    const r2Client = getR2Client();

    const command = new ListObjectsV2Command({
      Bucket: process.env.R2_BUCKET_NAME,
      Prefix: "clients/", // Mengunci pencarian hanya di folder portfolio
    });

    const response = await r2Client.send(command);

    // Filter agar nama folder itu sendiri tidak ikut masuk ke daftar (opsional)
    const images = response.Contents?.filter(item => item.Key !== "clients/")
      .map((item) => ({
        key: item.Key,
        url: `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${item.Key}`,
      })) || [];

    return images;
  } catch (error) {
    console.error("Gagal mengambil gambar portfolio:", error);
    return [];
  }
}




export async function uploadToR2(files: File[], folderName: string = "") {
  console.log("fired uploadToR2", files);
  if (files.length === 0) return [];

  try {
    const r2Client = getR2Client();

    // Menentukan prefix folder
    const prefix = folderName ? `${folderName}/` : "";

    const promises = files.map(async (file) => {
      // Gabungkan folder + timestamp + nama file
      const key = `${prefix}${Date.now()}-${file.name}`;

      const command = new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: key,
        Body: new Uint8Array(await file.arrayBuffer()),
        ContentType: file.type,
      });

      await r2Client.send(command);

      const finalImageUrl = `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${key}`;
      console.log("image url :", finalImageUrl);

      return { url: finalImageUrl, key };
    });

    const results = await Promise.all(promises);
    console.log("info", "Uploaded to R2:", results);
    return results;

  } catch (error) {
    console.error("Error uploading to R2:", error);
    throw error;
  }
}

export async function deleteFromR2(files: { fileId: string }[]) {
  try {
    const r2Client = getR2Client(); // Initialize client here
    const command = new DeleteObjectsCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Delete: {
        Objects: files.map((file) => ({ Key: file.fileId })),
        Quiet: false,
      },
    });

    const result = await r2Client.send(command);

    if (result.Errors && result?.Errors!.length > 0) {
      console.warn("Some files failed to delete:", result.Errors);
    }

    log("info", "Deleted from R2:", result.Deleted?.length || 0, "files");
    return result;
  } catch (error) {
    console.error("Error executing bulk delete from R2:", error);
    throw error;
  }
}
