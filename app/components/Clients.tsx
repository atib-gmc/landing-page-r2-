"use client"
import { MdOutlineDeleteForever } from "react-icons/md";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React, { useEffect, useState } from 'react'
import MyDropzone from './DropZone'
import { deleteFromR2, getClientImages, uploadToR2 } from '@/lib/r2'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function Clients() {
    const [images, setImages] = useState<File[]>([])
    const [clientImages, setClientImages] = useState<any[]>([])

    // 1. Keluarkan fetchData agar bisa dipanggil dari mana saja
    async function fetchData() {
        console.log("Mengambil data terbaru dari R2...");
        const data = await getClientImages();
        console.log(data)
        if (data) setClientImages(data);
    }

    // 2. Jalankan saat mount pertama kali
    useEffect(() => {
        fetchData();
    }, []);
    function deleteImage(index: number) {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    }

    async function uploadImages() {
        if (images.length === 0) return;
        try {
            await uploadToR2(images, "clients");
            alert("Images uploaded successfully");

            // 3. KUNCI UTAMA: Panggil fetchData lagi di sini!
            await fetchData();

            // Opsional: Kosongkan preview di dropzone setelah berhasil
            setImages([]);
        } catch (error) {
            alert("Error uploading images");
            console.error(error);
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Clients</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
                <div className="flex flex-wrap gap-2 ">
                    {clientImages.map((image) => (
                        <button onClick={async () => await deleteFromR2([{ fileId: image.key }]).then(() => fetchData())} key={image.key} className='relative h-[80px] w-[80px] overflow-hidden border rounded cursor-pointer group'>
                            <div className="absolute grid place-items-center bg-red-400 w-full h-full opacity-60 group translate-y-40 group-hover:translate-y-0 transition-all duration-200 ">
                                <MdOutlineDeleteForever size={40} color="white" />

                            </div>
                            <img
                                src={image?.url || ""}
                                alt={image?.key}
                                className='w-full h-full object-cover'
                            />
                        </button>
                    ))}
                </div>
                <h4 className="my-2 text-md font-semibold">Add New</h4>
                <MyDropzone setImages={setImages} />

                <div className="preview flex gap-2 flex-wrap">
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
                <Button onClick={uploadImages} className="cursor-pointer">
                    Upload Images
                </Button>
            </CardContent>
        </Card>
    )
}