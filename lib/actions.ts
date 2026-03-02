"use server"
import { revalidatePath } from "next/cache";
// import ImageKit from "imagekit"; // Import SDK-nya di sini
import client from "./supabaseClient";
import { imagekit } from "@/app/utils/imagekit";
import { deleteFromR2 } from "./r2";

// Inisialisasi ImageKit di server
export async function deletePost(post: any) {
    try {
        console.log("Memulai proses penghapusan post:", post.id);

        // 1. Tangani Hero Image (Karena formatnya String JSON)
        if (post.hero) {
            try {
                await deleteFromR2([...post.images_urls, post.hero]);
            } catch (e) {
                console.error("Gagal parse data hero:", e);
            }
        }

        // 2. Hapus data di Supabase
        const { error: supabaseError } = await client
            .from("posts")
            .delete()
            .eq("id", post.id);

        if (supabaseError) {
            return { success: false, message: supabaseError.message };
        }

        // 3. Update UI Dashboard
        revalidatePath("/dashboard");

        return { success: true, message: "Post and images deleted successfully" };

    } catch (error: any) {
        console.error("Fatal Error in deletePost:", error);
        // RETURN PLAIN OBJECT: Jangan return object Error asli
        return {
            success: false,
            message: error.message || "Terjadi kesalahan sistem saat menghapus post."
        };
    }
}
export async function getAllCategory() {
    return await client.from("categories").select("*").order("name", { ascending: false })
}

export async function getAllPosts() {
    return await client.from("posts").select("*,categories (id,name)").order("created_at", { ascending: false });
}

export async function deleteImage(fileId: any[] | string) {
    try {
        // Kasus 1: Jika input adalah Array
        if (Array.isArray(fileId)) {
            for (const item of fileId) {
                // Cek apakah item itu object {fileId: ...} atau string langsung
                const idToDelete = typeof item === 'object' ? item.fileId! : item;

                if (idToDelete) {
                    await imagekit.deleteFile(idToDelete);
                    console.log("Deleted array item:", idToDelete);
                }
            }
        }
        // Kasus 2: Jika input adalah String tunggal
        else if (typeof fileId === 'string' && fileId.trim() !== "") {
            await imagekit.deleteFile(fileId);
            console.log("Deleted single file:", fileId);
        }

        return { success: true };
    } catch (error: any) {
        console.error("Error deleting image:", error);
        // Kembalikan plain object agar tidak error di Next.js Client Component
        return { success: false, message: error.message || "Gagal menghapus gambar" };
    }
}


export async function getSinglePost(id: any) {
    return await client.from("posts").select("*, categories(name)").eq("id", id).single();
}