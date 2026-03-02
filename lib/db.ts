import client from "./supabaseClient";

export async function getPosts() {
    return client.from("posts").select("*");
}
export async function getCategories() {
    return client.from("categories").select("*")
}