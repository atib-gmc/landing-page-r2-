"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getCategories, getPosts } from "@/lib/db";

// Komponen Internal
import Posts from "./components/Posts";
import Clients from "../components/Clients";
import GetUser from "../utils/GetUser";

export default function DashboardPage() {
  const [refresh, setRefresh] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(true);

  // Ambil data user dari hook custom kamu
  const user = GetUser();
  const router = useRouter();

  useEffect(() => {
    // STRATEGI: Jangan lakukan apa-apa selama 'user' masih undefined (sedang loading)
    if (user === undefined) return;

    // Jika pengecekan selesai dan user fix tidak ada, baru usir ke homepage
    if (!user || !user.email) {
      router.push("/");
      return;
    }

    // Jika user ada, baru ambil data posts & categories
    async function fetchData() {
      setIsDataLoading(true);
      try {
        const [postsResponse, categoriesResponse] = await Promise.all([
          getPosts(),
          getCategories(),
        ]);

        setPosts(postsResponse?.data || []);
        setCategories(categoriesResponse?.data || []);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setIsDataLoading(false);
      }
    }

    fetchData();
  }, [user, router, refresh]);

  // 1. STATE LOADING: Muncul saat 'user' masih dicari atau data sedang ditarik
  // Ini mencegah UI Dashboard "berkedip" sebelum diusir
  if (user === undefined || (user && isDataLoading && posts.length === 0)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          <p className="text-sm font-medium text-gray-500">Authenticating...</p>
        </div>
      </div>
    );
  }

  // 2. SAFETY CHECK: Jika tidak ada user (setelah loading selesai), jangan render apa-apa
  if (!user?.email) return null;

  // 3. MAIN UI: Hanya tampil jika user valid
  return (
    <div className="min-h-screen mb-8 bg-gray-50 mt-10">
      <main className="pt-28 mx-auto max-w-7xl px-6">

        <section className="flex flex-col lg:flex-row w-full gap-6">
          {/* List Posts */}
          <div className="flex-1">
            <Posts
              categories={categories}
              refresh={refresh}
              setRefresh={setRefresh}
              posts={posts}
            />
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-4 w-full lg:w-80">
            <Card className="shadow-sm border-none">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <Button
                  onClick={() => router.push("/dashboard/create")}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  New Project
                </Button>
              </CardContent>
            </Card>

            <Clients />
          </div>
        </section>

      </main>
    </div>
  );
}
