import Modal from '@/app/components/Modal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Project } from '@/lib/data';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import SelectOption from './Select';
import { Select } from '@/components/ui/select';

// Added missing prop types for better type safety
export default function Posts({ posts, refresh, setRefresh, categories }: { categories: any[], posts?: any[], refresh: any, setRefresh: any }) {
    const [category, setCategory] = useState("")
    const [search, setSearch] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [sortBy, setSortBy] = useState("date-asc")
    const router = useRouter()

    const rows = 6

    // Handle initial empty state
    if (!posts || posts.length === 0) {
        return (
            <div className="flex justify-center items-center h-full min-h-[300px]">
                <h2 className="text-2xl font-bold">No posts found</h2>
            </div>
        )
    }

    // 1. Filter and ensure projects is always an array
    const filteredProjects = posts.filter((project: Project) => {
        const matchesCategory = category === "" || category === "all" ||
            project.category_id.toString().toLowerCase() === category.toLowerCase();

        const matchesSearch = project.title.toLowerCase().includes(search.toLowerCase());

        return matchesCategory && matchesSearch;
    });

    // 2. Sort the filtered array
    const projects = [...filteredProjects].sort((a: Project, b: Project) => {
        switch (sortBy) {
            case "name-asc":
                return a.title.localeCompare(b.title)
            case "name-desc":
                return b.title.localeCompare(a.title)
            case "date-asc":
                return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
            case "date-desc":
                return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
            default:
                return 0;
        }
    });

    // 3. Safe pagination calculations
    const totalPages = Math.ceil(projects.length / rows)

    // Reset to page 1 if search/filter results in fewer pages
    if (totalPages > 0 && currentPage > totalPages) {
        setCurrentPage(1);
    }

    const startIndex = (currentPage - 1) * rows
    const endIndex = startIndex + rows
    const currentPosts = projects.slice(startIndex, endIndex)

    return (
        <Card className="lg:col-span-2 flex-2">
            <CardHeader>
                <CardTitle>Recent Post</CardTitle>
            </CardHeader>
            <div className="toolbar pl-8 flex gap-3 ">
                <div className="">
                    <Input placeholder='search' onChange={e => setSearch(e.target.value)} />
                </div>
                <div className="">
                    <SelectOption items={categories} setSelected={setCategory} showAll placeholder='Category' />
                </div>
                <div className="">
                    <SelectOption items={[
                        { id: "name-asc", name: "Name (A-Z)" },
                        { id: "name-desc", name: "Name (Z-A)" },
                        { id: "date-asc", name: "Date Newest" },
                        { id: "date-desc", name: "Date Oldest" }
                    ]} setSelected={setSortBy} showAll={false} placeholder='↑↓ sort' />
                </div>
            </div>

            <div className="px-8">
                <Select>
                    {/* Placeholder for Select component content */}
                </Select>
            </div>

            <CardContent className="space-y-4 flex gap-10 flex-wrap justify-start text-sm mt-4">
                {currentPosts.map((post: any) => (
                    <div
                        key={post.id}
                        className="p-4 border max-w-[15rem] h-[15rem] flex flex-col gap-2 border-gray-200 rounded-lg hover:shadow-md transition"
                    >
                        <Link className='flex-1 overflow-hidden' href={`/content/${post.id}`}>
                            <img src={post?.hero?.url} alt={post.title} className="w-full h-24 object-cover" />
                            <h3 className="text-lg font-semibold mb-2 truncate">
                                {post.title}
                            </h3>
                        </Link>

                        <Button
                            className="cursor-pointer"
                            variant="outline"
                            size="sm"
                            onClick={() => router.push(`/dashboard/edit/${post.id}`)}
                        >
                            Edit Post
                        </Button>

                        <Modal setRefresh={setRefresh} post={post} />
                    </div>
                ))}
            </CardContent>

            {/* Pagination */}
            {totalPages > 0 && (
                <div className="py-6">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                />
                            </PaginationItem>

                            {[...Array(totalPages)].map((_, i) => (
                                <PaginationItem key={i}>
                                    <PaginationLink
                                        isActive={currentPage === i + 1}
                                        onClick={() => setCurrentPage(i + 1)}
                                        className={`${i === currentPage - 1 ? "bg-accent text-accent-foreground" : ""} cursor-pointer`}
                                    >
                                        {i + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}

                            <PaginationItem>
                                <PaginationNext
                                    onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}
        </Card>
    )
}