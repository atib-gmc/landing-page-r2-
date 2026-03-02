"use server"
import { revalidatePath } from "next/cache";
import client from "./supabaseClient";
import { deleteFromR2 } from "./r2";

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



export async function getSinglePost(id: any) {
    return await client.from("posts").select("*, categories(name)").eq("id", id).single();
}