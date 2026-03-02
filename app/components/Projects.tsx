// components/ArticleGrid.js
"use client";
import { getAllPosts } from '@/lib/actions';
import { log } from '@/lib/logger';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Dummy data for the cards

const ArticleCard = (post: any) => {
    // Use a dynamic height class based on the 'isTall' property
    log("info", "post", post);
    return (
        <Link href={`/content/${post?.article.id}`} key={post?.article.id} className={`  max-h-96  `}>
            <div
                style={{ background: `url(${post?.article.hero?.url})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                className={`relative bg-cover bg-center flex items-end p-6 transition-transform overflow-hidden duration-300 ease-in-out transform hover:scale-[1.02] rounded-lg shadow hover:shadow-lg h-80  text-white`}
            >
                {/* The Whoosh logo would be an Image component here */}

                {/* Category/Footer text */}
            </div>

            <p className="text-sm pt-2 text-gray-600">
                {/* {post?.article.tags.map((tag: any) => <span key={tag.name} className="text-gray-600">#{tag.name}</span>)} */}
                {post?.article.tags?.map((tag: any) => <span key={tag}>#{tag} </span>)}
                {/* {article.category} */}
            </p>
            <h2 className="text-xl py-2 self-start text-foreground   ">
                {post?.article.title}
            </h2>
        </Link>
    );
};

const ArticleGrid = () => {

    const [post, setPost] = useState<any>(null)
    useEffect(() => {
        async function fetchData() {
            const res = await getAllPosts()
            if (res.data) {
                setPost(res.data)
            }
        } fetchData();
        // Any side effects if needed
    }, [])
    return (
        <div className="container mx-auto p-4">
            {/* 2-column grid on small screens, which collapses to 1 column on extra small screens if needed */}
            <div className="grid grid-cols-1 sm:grid-cols-3  gap-4">
                {post?.map((article: any) => (
                    <ArticleCard key={article.id} article={article} />
                ))}
            </div>
        </div>
    );
};

export default ArticleGrid;