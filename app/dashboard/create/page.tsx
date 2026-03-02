"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MyDropzone from "@/app/components/DropZone";
import { useEffect, useState } from "react";
import Image from "next/image";
import RichTextEditor from "@/app/components/RichText";
import { useRouter } from "next/navigation";
import client from "@/lib/supabaseClient";
import Loader from "@/app/components/Loader";
import { getAllCategory } from "@/lib/actions";
import CategorySelect from "./select";
import TagsInput from "./inputTag";
import { Textarea } from "@/components/ui/textarea";
import { uploadToR2 } from "@/lib/r2";
import { log } from "@/lib/logger";

export default function CreatePostPage() {
    const router = useRouter();
    const [date, setDate] = useState("");
    const [scope, setScope] = useState("");
    const [credit, setCredit] = useState("");
    const [tags, setTags] = useState([]);
    const [category, setCategory] = useState<any>([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [hero, setHero] = useState<File | null>(null);
    const [isPending, setIspending] = useState(false);
    const [status, setStatus] = useState("");
    const [images, setImages] = useState<File[]>([]);
    const [title, setTitle] = useState("");
    const [markdown, setMarkdown] = useState("");
    const [error, setError] = useState("");

    function deleteImage(index: number) {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    }

    useEffect(() => {
        async function getCategories() {
            const { data } = await getAllCategory();
            setCategory(data);
        }
        getCategories();
    }, []);

    const uploadSemuaGambar = async () => {

        let heroUrl = null;
        const daftarUrlHasil = [];

        if (hero) {
            setStatus("Uploading hero image...");
            const resHero = await uploadToR2([hero]);
            if (resHero && resHero[0]) {
                heroUrl = { url: resHero[0].url, fileId: resHero[0].key };
            }
        }

        if (images.length > 0) {
            setStatus(`Uploading ${images.length} images...`);
            for (const file of images) {
                const urlImage = await uploadToR2([file]);
                if (urlImage && urlImage[0]) {
                    const data = { url: urlImage[0].url, fileId: urlImage[0].key };
                    daftarUrlHasil.push(data);
                }
            }
        }
        log("info", "heroUrl", heroUrl, "galleryUrls", daftarUrlHasil);
        return { heroUrl, galleryUrls: daftarUrlHasil };
    };

    async function uploadPost() {
        setError("");
        // Validasi
        if (!title.trim() || !markdown.trim() || (!hero && images.length === 0) || !date || !selectedCategory) {
            setError("Please fill all required fields.");
            return;
        }

        setIspending(true);
        setStatus("Starting upload process...");

        try {
            const { heroUrl, galleryUrls } = await uploadSemuaGambar();

            setStatus("Saving post to database...");
            const { error: supabaseError } = await client.from("posts").insert({
                date,
                scope_of_work: scope,
                credit,
                tags,
                category_id: selectedCategory,
                title,
                content: markdown,
                slug: title.toLowerCase().replace(/\s+/g, '-'),
                images_urls: galleryUrls,
                hero: heroUrl
            });

            if (supabaseError) throw supabaseError;

            alert("Post created successfully!");
            router.push("/dashboard");
        } catch (err) {
            console.error(err);
            setError("Something went wrong during upload or saving.");
        } finally {
            setIspending(false);
            setStatus("");
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="fixed top-0 left-0 w-full bg-white border-b z-50">
                <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-6">
                    <h1 className="text-xl font-semibold">Create Post</h1>
                    <Button onClick={() => router.push("/dashboard")} variant="outline">Back</Button>
                </div>
            </header>

            <main className="pt-28 mx-auto max-w-3xl px-6 pb-20">
                <Card>
                    <CardHeader>
                        <CardTitle>New Post</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Hero Image */}
                        <div className="space-y-2">
                            <Label className="font-semibold">Hero Image</Label>
                            <div className="relative w-full h-48 border rounded-md overflow-hidden bg-gray-100">
                                {hero ? (
                                    <Image
                                        src={URL.createObjectURL(hero)}
                                        alt="Hero Preview"
                                        fill
                                        className="object-cover cursor-pointer"
                                        onClick={() => setHero(null)}
                                    />
                                ) : (
                                    <MyDropzone maxFiles={1} multiple={false} setImages={setHero} />
                                )}
                            </div>
                        </div>

                        {/* Title */}
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input value={title} onChange={e => setTitle(e.target.value)} id="title" placeholder="Enter post title" />
                        </div>

                        {/* Gallery Images */}
                        <div className="space-y-2">
                            <Label>Gallery Images</Label>
                            <MyDropzone setImages={setImages} />
                            <div className="flex gap-2 flex-wrap mt-2">
                                {images.map((file, index) => (
                                    <div key={index} className="relative w-20 h-20 border rounded-md overflow-hidden">
                                        <Image
                                            src={URL.createObjectURL(file)}
                                            alt="preview"
                                            fill
                                            className="object-cover cursor-pointer"
                                            onClick={() => deleteImage(index)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="space-y-2">
                            <Label>Content</Label>
                            <RichTextEditor value={markdown} onchange={setMarkdown} />
                        </div>

                        {/* Date & Scope */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="date">Date</Label>
                                <Input id="date" value={date} onChange={e => setDate(e.target.value)} type="date" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="scope">Scope Of Work</Label>
                                <Input value={scope} onChange={e => setScope(e.target.value)} id="scope" />
                            </div>
                        </div>

                        {/* Category & Tags */}
                        <div className="space-y-2">
                            <CategorySelect selectedCategory={selectedCategory} setSelectCategory={setSelectedCategory} categories={category} />
                        </div>
                        <div className="space-y-2">
                            <Label>Tags</Label>
                            <TagsInput id="tags" tags={tags} setTags={setTags} />
                        </div>

                        {/* Credit */}
                        <div className="space-y-2">
                            <Label htmlFor="credit">Credit</Label>
                            <Textarea value={credit} onChange={e => setCredit(e.target.value)} id="credit" className="min-h-24" />
                        </div>

                        {isPending && <Loader>{status}</Loader>}
                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <div className="flex justify-end gap-3">
                            <Button disabled={isPending} variant="outline" onClick={() => router.push("/dashboard")}>
                                Cancel
                            </Button>
                            <Button className="cursor-pointer" disabled={isPending} onClick={uploadPost}>
                                {isPending ? "Processing..." : "Publish Post"}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}