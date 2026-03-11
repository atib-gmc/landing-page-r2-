"use client";

import { FaEdit } from "react-icons/fa";

import React, { useEffect, useState } from "react";
import GetUser from "../utils/GetUser";
import { getPage } from "@/lib/actions";
interface PageContent {
  id: number;
  created_at: string; // ISO date string format
  title: string;
  description: string;
  content_title: string;
  content_desc: string;
  page: string;
}

export default function AboutPage() {
  const [pageContent, sePageContent] = useState<PageContent | null>(null)
  const user = GetUser();
  const isEditable = user !== null;

  // State untuk semua bagian konten
  const [heroTitle, setHeroTitle] = useState("");
  const [heroSub, setHeroSub] = useState("Setiap desain adalah panggung kecil tempat imajinasi berdiri di tengah sorotan.");
  const [sectionTitle, setSectionTitle] = useState("Crafting Visual Stories");
  const [sectionDesc, setSectionDesc] = useState(`Inspired by the concept of Samsara, the ever-repeating cycle of rebirth...`);

  const handleBlur = (setter: React.Dispatch<React.SetStateAction<string>>, e: React.FocusEvent<HTMLElement>) => {
    if (isEditable) {
      setter(e.currentTarget.textContent || "");
    }
  };
  async function getPageContent() {
    const { data } = await getPage("about")
    console.log(data?.title! as string)
    // setHeroTitle(data?.title!)
    sePageContent(data as any)
  }
  useEffect(() => {
    getPageContent()

  }, [])



  return (
    <main className="w-full bg-black text-white">
      {/* Indikator Admin */}
      {isEditable && (
        <div className="fixed top-4 right-4 z-50 bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
          Admin Mode: Editing Enabled
        </div>
      )}

      {/* Hero Section */}
      <section className="relative w-full h-screen flex items-center justify-center">
        <button className="duration-300 cursor-pointer z-10 absolute right-5 hover:text-white text-gray-300  hover:scale-110   transition-all ">
          <FaEdit size={42} />
          <span className=" block translate-x-2.5 whitespace-nowrap text-start  delay-30 group absolute">edit image</span>
        </button>

        <img
          src="/design/hero.jpeg"
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="relative z-10 text-center px-6 max-w-xl">
          <h1
            contentEditable={isEditable}
            suppressContentEditableWarning={true}
            onBlur={(e) => handleBlur(setHeroTitle, e)}
            className={`text-4xl font-bold mb-4 outline-none transition-all ${isEditable ? "focus:ring-1 ring-zinc-500 cursor-text" : "cursor-default"
              }`}
          >
            {pageContent?.title}
          </h1>
          <p
            contentEditable={isEditable}
            suppressContentEditableWarning={true}
            onBlur={(e) => handleBlur(setHeroSub, e)}
            className={`text-base leading-relaxed outline-none transition-all ${isEditable ? "focus:ring-1 ring-zinc-500 cursor-text" : "cursor-default"
              }`}
          >
            {pageContent?.description}
          </p>
        </div>
      </section>

      {/* Section yang Tadi Menghilang (Sudah Muncul Lagi) */}
      <section className="w-full px-6 py-20 flex flex-col gap-10 md:flex-row md:items-center md:justify-center max-w-5xl mx-auto">
        <div className="flex-1 space-y-4">
          <h2
            contentEditable={isEditable}
            suppressContentEditableWarning={true}
            onBlur={(e) => handleBlur(setSectionTitle, e)}
            className={`text-2xl font-semibold outline-none ${isEditable ? "focus:ring-1 ring-zinc-500" : ""}`}
          >
            {pageContent?.content_title}
          </h2>
          <p
            contentEditable={isEditable}
            suppressContentEditableWarning={true}
            onBlur={(e) => handleBlur(setSectionDesc, e)}
            className={`leading-relaxed outline-none ${isEditable ? "focus:ring-1 ring-zinc-500" : ""}`}
          >
            {pageContent?.content_desc}
          </p>
        </div>
        <img
          src="/design/side.jpeg"
          alt="Design Work"
          className="flex-1 w-full rounded-xl object-cover max-h-96"
        />
      </section>
    </main>
  );
}
