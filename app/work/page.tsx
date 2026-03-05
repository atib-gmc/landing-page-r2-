"use client"
import { FaArrowDown19, FaArrowUp19 } from "react-icons/fa6";

import { FaArrowUpAZ } from "react-icons/fa6";
import { FaArrowDownAZ } from "react-icons/fa6";
import { Button } from '@/components/ui/button'
import data, { Category, Project } from '@/lib/data'
import { getCategories, getPosts } from '@/lib/db'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { IoIosArrowForward } from "react-icons/io";

import { useEffect, useState } from 'react'


export default function page() {
    const [open, setOpen] = useState(false)
    const [projects, setProjects] = useState<Project[]>([])
    const [sortBy, setSortBy] = useState("date-asc")
    const [category, setCategory] = useState("all")
    const [categories, setCategories] = useState<Category[]>([])

    const filteredProjects = projects.filter(project => {
        // 1. Logika Kategori
        const matchesCategory = category === "" || category === "all" ||
            project.category_id.toString().toLowerCase() === category.toLowerCase();

        // Hanya kembalikan true jika KEDUA syarat terpenuhi
        return matchesCategory;
        //@ts-ignore
    }).sort((a, b) => {
        // return a.title.localeCompare(b.title)
        switch (sortBy) {
            case "name-asc":
                return a.title.localeCompare(b.title)
            case "name-desc":
                return b.title.localeCompare(a.title)
            case "date-asc":
                return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
            case "date-desc":
                return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        }
    })
    useEffect(() => {
        async function fetchAll() {
            const postResult = await getPosts()
            const categoryResult = await getCategories()
            console.log(categoryResult)
            setCategories(categoryResult?.data! as any)
            setProjects(postResult?.data!)
        }
        fetchAll()
    }, [])

    function sortByName() {
        if (sortBy === "name-asc") {
            setSortBy("name-desc")
        } else {
            setSortBy("name-asc")
        }
    }
    function sortByNewest() {
        if (sortBy === "date-asc") {
            setSortBy("date-desc")
        } else {
            setSortBy("date-asc")
        }
    }
    return (
        <div className="w-screen bg-black pb-10">
            <div className="hero w-full h-screen">
                <img src="works.jpg" alt="works" className="w-full object-cover  h-full" />
            </div>
            <div className="greetings items-center px-8  bg-black py-14 flex">
                <div className="row title flex-1">
                    <h2 className="text-3xl text-white font-semibold">
                        Crafting the Next Generation of Visuals
                    </h2>
                </div>
                <div className="row flex-1 text-gray-200 ">
                    <p>
                        From bold illustrations to cohesive brand identities, I explore the intersection of modern aesthetics and functional design. I believe that
                        being a designer means constantly evolving and applying fresh perspectives across every platform.
                        This collection represents my dedication to precise craftsmanship and my journey in pushing creative boundaries.
                    </p>
                </div>
            </div>
            {/* //toolbar */}
            <div className="collapsible w-full py-2 items-center flex  gap-2 bg-black px-8">
                <button onClick={() => setOpen(pre => !pre)} className='text-white flex gap-2 cursor-pointer flex-1'><span>Categories</span><IoIosArrowForward className={`${open ? "rotate-90" : ""} transition-all duration-300`} size={26} />
                </button>
                <div className='filter justify-center  items-center flex flex-1 ml-auto gap-4'>
                    <div className="">Sort by</div>
                    <button onClick={sortByName} className='cursor-pointer text-gray-300 flex gap-2 items-center'><span>Name</span> {sortBy === "name-asc" ? <FaArrowDownAZ /> : <FaArrowUpAZ />}</button>
                    <button onClick={sortByNewest} className='cursor-pointer text-gray-300 flex gap-2 items-center'><span>Newest</span> {sortBy === "date-asc" ? <FaArrowDown19 /> : <FaArrowUp19 />}</button>
                </div>
            </div>
            {/* collapse */}
            <div className={`transition-all py-4 duration-500 ease-in-out overflow-hidden bg-black px-8 ${open ? "max-h-96 opacity-100 py-4" : "max-h-0 opacity-0 py-0"
                }`}>
                <Button size='sm' className={`${category === "all" ? "bg-white text-black" : "bg-black text-white"} my-2 transition-all duration-300 mr-2`} variant='outline' onClick={() => setCategory("all")} >All</Button>
                {categories.map((project) => (
                    <Button size='sm' className={`${category === project.id ? "bg-white text-black" : "bg-black text-white"} mr-2`} variant='outline' onClick={() => setCategory(project.id)} key={project?.id}>{project?.name}</Button>
                ))}
            </div>
            <div className="flex gap-4 flex-wrap justify-center items-center bg-black   ">
                {filteredProjects.map((post) => (
                    <Link href={`/content/${post?.id}`} key={post?.id} className={`w-xs h-xs rounded-lg overflow-hidden shadow-lg   max-h-80 `}>
                        <div
                            style={{ background: `url(${post?.hero?.url})` }}
                            className={`relative flex items-end p-6 transition-transform duration-300 ease-in-out transform hover:scale-[1.02] h-80 text-white`}
                        >
                            {/* The Whoosh logo would be an Image component here */}
                            <h2 className="text-3xl self-start font-serif italic absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                {post?.title}
                            </h2>

                            {/* Category/Footer text */}
                            <p className="text-base">
                                {/* {article.category} */}
                            </p>
                        </div>
                    </Link>

                ))}

            </div>

        </div>
    )
}
