"use server";
import { S3Client, PutObjectCommand, DeleteObjectCommand, DeleteObjectsCommand } from "@aws-sdk/client-s3";
import { log } from "./logger";

const r2Client = new S3Client({
    region: "auto",
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    },
});

// Pastikan ada kata EXPORT di bawah ini
export async function uploadToR2(files: File[]) {
    console.log("fired uploadToR2", files)
    if (files.length === 0) return;
    console.log("files", files);
    try {
        const promises = files.map(async (file) => {
            const key = `${Date.now()}-${file.name}`
            const command = new PutObjectCommand({
                Bucket: process.env.R2_BUCKET_NAME,
                Key: key,
                Body: new Uint8Array(await file.arrayBuffer()),
                ContentType: file.type,
            });
            const result = await r2Client.send(command);
            const finalImageUrl = `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${key}`;
            console.log("image url :", finalImageUrl);
            return { url: finalImageUrl, key }
        });
        const results = await Promise.all(promises);
        log("info", "Uploaded to R2:", results);
        return results;

    } catch (error) {
        console.error("Error uploading to R2:", error);
        throw error;
    }
}

export async function deleteFromR2(files: { fileId: string }[]) {
    // log("info", "Deleting from R2:", files.map((file) => ({ Key: file.fileId })));
    // return
    try {
        const command = new DeleteObjectsCommand({
            Bucket: process.env.R2_BUCKET_NAME,
            Delete: {
                Objects: files.map((file) => ({ Key: file.fileId })),
                Quiet: false, // Set to true if you don't need a detailed summary of each deleted file
            },
        });

        const result = await r2Client.send(command);

        // Log any specific errors for individual files
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