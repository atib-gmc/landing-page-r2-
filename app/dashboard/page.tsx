"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getCategories, getPosts } from "@/lib/db";
import { useEffect, useState } from "react";
import Modal from "@/app/components/Modal";
import data from "@/lib/data";
import Posts from "./components/Posts";

export default function DashboardPage() {
    const [refresh, setRefresh] = useState(false)
    // const user = GetUser()
    const [posts, setPosts] = useState<any>(null)
    const [categories, setCategories] = useState<any>([])
    const router = useRouter()
    useEffect(() => {
        async function fetchPosts() {
            const data: any = await getPosts();
            const categories = await getCategories()
            setCategories(categories.data)
            console.log("category: ", categories)
            console.log(data)
            setPosts(data?.data);
        }
        fetchPosts();
    }, [refresh])

    // if (!user) router.push("/")
    return (
        <div className="min-h-screen bg-gray-50 mt-10">
            {/* Navbar */}
            {/* <header className="fixed top-0 left-0 w-full bg-white border-b z-50">
                <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
                    <h1 className="text-xl font-semibold">amvara</h1>
                    <nav className="flex gap-6 text-sm uppercase">
                        <a href="#" className="hover:underline">Home</a>
                        <a href="#" className="hover:underline">About</a>
                        <a href="#" className="hover:underline">Contact</a>
                    </nav>
                </div>
            </header> */}

            {/* Main */}
            <main className="pt-28 mx-auto max-w-7xl px-6">
                {/* Top Section */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <Card>
                        <CardHeader>
                            <CardTitle>Posts</CardTitle>
                        </CardHeader>
                        <CardContent className="text-3xl font-bold">{posts?.length || 0}</CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Active Tasks</CardTitle>
                        </CardHeader>
                        <CardContent className="text-3xl font-bold">34</CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Messages</CardTitle>
                        </CardHeader>
                        <CardContent className="text-3xl font-bold">5</CardContent>
                    </Card>
                </section>

                {/* Content Section */}
                <section className="flex    w-full   grid-cols-1 lg:grid-cols-3 gap-6">
                    <Posts categories={categories} refresh={refresh} setRefresh={setRefresh} posts={posts} />
                    <Card className="self-start">
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-3">
                            <Button onClick={() => router.push("/dashboard/create")} className="cursor-pointer">New Project</Button>
                        </CardContent>
                    </Card>
                </section>
            </main>

            {/* CTA Footer Section */}
            <section className="mt-20 bg-blue-600 text-white">
                <div className="mx-auto max-w-7xl px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-6">
                    <h2 className="text-3xl font-semibold">Tell us your vision</h2>
                    <div className="flex gap-4">
                        <Link href="/dashboard/create" className="btn cursor-pointer">New Project</Link>
                        <Button variant="secondary">Join Us</Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
