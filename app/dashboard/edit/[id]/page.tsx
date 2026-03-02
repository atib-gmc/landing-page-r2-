"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MyDropzone from "@/app/components/DropZone";
import { useEffect, useState } from "react";
import Image from "next/image";
import RichTextEditor from "@/app/components/RichText";
import { useParams, useRouter } from "next/navigation";
import client from "@/lib/supabaseClient";
import Loader from "@/app/components/Loader";
import { renameImages } from "@/app/utils/func";
import { getAllCategory, getSinglePost } from "@/lib/actions";
import CategorySelect from "../../create/select";
import TagsInput from "../../create/inputTag";
import { Textarea } from "@/components/ui/textarea";
import { deleteFromR2, uploadToR2 } from "@/lib/r2";
import { log } from "@/lib/logger";

export default function EditPage() {
    // const [post, setPost] = useState<any>(null)
    const router = useRouter();
    const { id } = useParams()
    const [date, setDate] = useState<any>("")
    const [scope, setScope] = useState("")
    const [credit, setCredit] = useState("")
    const [tags, setTags] = useState([])
    const [category, setCategory] = useState<any>([])
    const [selectedCategory, setSelectedCategory] = useState("")
    const [hero, setHero] = useState<any>(null);
    const [isPending, setIspending] = useState(false);
    const [status, setStatus] = useState("");
    const [images, setImages] = useState<any>([]);
    const [title, setTitle] = useState("");
    const [markdown, setMarkdown] = useState("");
    const [error, setError] = useState("");
    const [deleteImages, setDeleteImages] = useState<{ fileId: string }[]>([]);

    useEffect(() => {
        async function getData() {
            setIspending(true);
            try {
                const { data: categories } = await getAllCategory()
                setCategory(categories)
                const dataPost = await getSinglePost(id);
                console.log("dataPost:", dataPost)
                if (dataPost?.data) {
                    const p = dataPost.data;
                    // setPost(p);aing make imagefix hostingan gambarna, free storage 10gb  

                    // ISI STATE INPUT DISINI
                    setTitle(p?.title || "");
                    setMarkdown(p?.content || "");
                    setHero(p?.hero)
                    setImages(p?.images_urls);
                    setDate(p?.date || "");
                    setScope(p?.scope_of_work || "");
                    setCredit(p?.credit || "");
                    console.log("fetch tags:", p?.tags)

                    setTags(p?.tags || []);
                    setSelectedCategory(p?.category_id || "");

                    // Catatan: Hero dan Images biasanya butuh logic khusus 
                    // karena state kamu mengharapkan File object dari Dropzone
                }
            } catch (err) {
                console.error("Error fetch:", err);
            } finally {
                setIspending(false);
            }
        }

        if (id) getData();
    }, [id]); // Tambahkan id sebagai dependency agar aman

    function deleteImage(image: any) {
        // Ambil key dari berbagai kemungkinan struktur
        const fileId = image.fileId || image.key;

        if (fileId) {
            setDeleteImages(prev => [...prev, { fileId }]);
        }

        setImages((prevImages: any) =>
            prevImages.filter((img: any) => img !== image)
        );
    }

    // console.log(images)
    const uploadSemuaGambar = async () => {

        let heroUrl = hero.url ? hero : null;
        const daftarUrlHasil: any = [];

        // 1. Upload HERO jika ada dan jika hero imagenya file baru
        console.log("hero baru ?", (hero && Boolean(hero.name)))
        if (hero && Boolean(hero.name)) {
            console.log("hero gambar baru")
            setStatus("Updating hero image...");
            // const heroRenamed = renameImages(hero, "hero_");
            // const authHero = await fetch("/api/auth-imagekit").then(res => res.json());

            // const formDataHero = new FormData();
            // formDataHero.append("file", heroRenamed);
            // formDataHero.append("fileName", heroRenamed.name);
            // formDataHero.append("publicKey", process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!);
            // formDataHero.append("signature", authHero.signature);
            // formDataHero.append("expire", authHero.expire.toString());
            // formDataHero.append("token", authHero.token);

            // const resHero = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
            //     method: "POST",
            //     body: formDataHero,
            // });
            // const dataHero = await resHero.json();
            const result = await uploadToR2([hero])
            heroUrl = { url: result?.[0].url, fileId: result?.[0].key };
        }

        // let imagesForUpload = []
        // 2. Upload Gallery Images
        if (images.length > 0) {
            setStatus(`Uploading ${images.length} images...`);

            const imagesForUpload = images.filter((image: any) => image.name)
            if (imagesForUpload.length == 0) {
                return { heroUrl, galleryUrls: [...images] };
            }
            const result = await uploadToR2(imagesForUpload)
            console.log(result)
            daftarUrlHasil.push(...result!)

        } else {
            daftarUrlHasil.push(...images)
        }

        return { heroUrl, galleryUrls: daftarUrlHasil };
    };

    async function uploadPost() {
        console.log(tags)
        return
        setError("");
        if (title.trim() === "" || markdown.trim() === "" || (!hero && images.length === 0) || !hero) {
            setError("Please fill all fields and add at least one image.");
            return;
        }

        setIspending(true);
        setStatus("Starting upload process...");

        try {
            // Jalankan upload gambar dulu
            const { galleryUrls, heroUrl } = await uploadSemuaGambar();

            // Simpan ke Supabase
            setStatus("updating post to database...");
            const { error: supabaseError } = await client.from("posts").update({
                title,
                content: markdown,
                slug: title.toLowerCase().replace(/\s+/g, '-'),
                images_urls: galleryUrls, // Ini menyimpan array [{url, fileId}, ...]
                hero: heroUrl,
                category_id: selectedCategory,
                tags: tags,
                date,
                scope_of_work: scope,
                credit
            }).eq("id", id);
            //hapus deletedImages to imagekit

            if (supabaseError) throw supabaseError;
            if (deleteImages.length > 0) {
                setStatus("Deleting removed images...");
                deleteFromR2(deleteImages);
            }

            alert("Post Updated successfully!");
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
        <div className="min-h-screen bg-gray-50 pt-26">
            <header className="fixed top-0 left-0 w-full bg-white border-b z-50">
                <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-6">
                    <h1 className="text-xl font-semibold">Create Post</h1>
                    <Button onClick={() => router.push("/dashboard")} variant="outline">Back</Button>
                </div>
            </header>

            <main className=" mx-auto max-w-3xl px-6 pb-20">
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
                                        src={
                                            (hero.name)
                                                ? URL.createObjectURL(hero)
                                                : hero.url
                                        }
                                        alt="Hero Preview"
                                        fill
                                        className="object-cover cursor-pointer"
                                        onClick={() => setHero(null)}
                                        unoptimized
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

                        {/* Additional Gallery Images */}
                        <div className="space-y-2">
                            <Label>Gallery Images</Label>
                            <MyDropzone setImages={setImages} />
                            <div className="flex gap-2 flex-wrap mt-2">
                                {images.map((file: any, i: any) => (
                                    <div key={i} className="relative  h-20 w-20 border rounded-md overflow-hidden">
                                        <Image
                                            src={file.url ? file.url : URL.createObjectURL(file)}
                                            alt="preview"
                                            fill
                                            className="object-cover cursor-pointer"
                                            onClick={() => deleteImage(file)}
                                            unoptimized
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

                        {/* date */}
                        <div className="space-y-2">
                            <Label htmlFor="date">Date</Label>
                            <Input id="date" value={date} onChange={e => setDate(e.target.value)} type="date" placeholder="Enter post title" />
                        </div>

                        {/* scope of work */}
                        <div className="space-y-2">
                            <Label htmlFor="scope">Scope Of Work</Label>
                            <input value={scope} onChange={e => setScope(e.target.value)} id="scope" placeholder="" className="input rounded-sm ring-gray-300 ring-1  w-full  p-2" />
                        </div>

                        {/* category */}
                        <div className="space-y-2">
                            {/* <Label htmlFor="title">Category</Label> */}
                            {/* <Input type="date" placeholder="Enter post title" /> */}
                            <CategorySelect selectedCategory={selectedCategory} setSelectCategory={setSelectedCategory} categories={category} />
                        </div>

                        {/* tags */}
                        <div className="space-y-2">
                            <Label htmlFor="tags">Tags</Label>
                            {/* <Input type="date" placeholder="Enter post title" /> */}
                            <TagsInput id="tags" tags={tags} setTags={setTags} />
                        </div>

                        {/* credit */}
                        <div className="space-y-2">
                            <Label htmlFor="scope">credit</Label>
                            <Textarea value={credit} onChange={e => setCredit(e.target.value)} id="scope" placeholder="" className="bg-input  w-full min-h-24 p-2" />
                        </div>

                        {isPending && <Loader>{status}</Loader>}
                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <div className="flex justify-end gap-3">
                            <Button disabled={isPending} variant="outline" onClick={() => router.push("/dashboard")}>
                                Cancel
                            </Button>
                            <Button disabled={isPending}
                                onClick={uploadPost}
                            // onClick={uploadSemuaGambar}
                            >
                                {isPending ? "Processing..." : "Update Post"}
                            </Button>
                        </div>

                    </CardContent>
                </Card>
            </main>
        </div>
    );
}