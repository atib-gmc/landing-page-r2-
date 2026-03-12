"use client"; // If using Next.js App Router
import { useState, useEffect } from "react";
import client from "@/lib/supabaseClient";
import { FaEdit } from "react-icons/fa";
import { deleteFromR2, getImagesFromFolder, uploadToR2 } from "@/lib/r2";

// Define the interface for clarity
interface PageContent {
  id: number;
  created_at: string;
  title: string;
  description: string;
  content_title: string;
  content_desc: string;
  page: string;
}

export default function AboutPage() {
  const [previewUrl, setPreviewUrl] = useState<string | null>("")
  const [pageContent, setPageContent] = useState<PageContent | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [heroImage, setHeroImage] = useState<{ url: any, key?: string }>({ url: "" })

  const imageUrl = (heroImage instanceof File)
    ? URL.createObjectURL(heroImage)
    : heroImage;
  // Mocking GetUser - replace with your actual auth hook
  const user = { role: 'admin' };
  const isEditable = user !== null;

  useEffect(() => {
    const currentUrl = heroImage.url;

    // 1. Jika tidak ada apa-apa, reset preview
    if (!currentUrl) {
      setPreviewUrl(null);
      return;
    }

    // 2. Jika ini adalah string (URL dari R2/Supabase)
    if (typeof currentUrl === "string") {
      setPreviewUrl(currentUrl);
      return;
    }

    // 3. Jika ini adalah File (baru di-upload dari ThinkPad kamu)
    if (currentUrl instanceof File || currentUrl instanceof Blob) {
      const objectUrl = URL.createObjectURL(currentUrl);
      setPreviewUrl(objectUrl);

      // Cleanup agar RAM ThinkPad T440p kamu tidak bocor
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [heroImage]);
  // 1. Fetch data on mount
  useEffect(() => {
    async function getPageContent() {
      const urlImage = await getImagesFromFolder("heroAbout")
      if (urlImage) {
        const { key, url } = urlImage[0]
        setHeroImage({ url, key })
      }
      const { data, error } = await client
        .from("pages")
        .select("*")
        .eq("page", "about")
        .single();

      if (data) setPageContent(data);
      if (error) console.error("Error fetching:", error);
    }
    getPageContent();
  }, []);


  async function changeImage(file: File) {
    if (!file.name) return
    try {
      //kalo ada image from cloud, hapus
      if (heroImage.key) {
        deleteFromR2([{ fileId: heroImage.key as string }])
      }
      const url = await uploadToR2([file], 'heroAbout')
      setHeroImage({ url: url[0].url, key: url[0].key })
    } catch (error) {
      console.log("error", error)
    }
  }
  // 2. Optimized Update Function
  async function updatePage(updatedData: PageContent) {
    setIsSaving(true);
    try {
      const { error } = await client
        .from("pages")
        .update(updatedData)
        .eq("id", updatedData.id);

      if (error) throw error;
      console.log("Database updated successfully");
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setIsSaving(false);
    }
  }

  // 3. The "Immediate" Blur Handler
  const handleBlur = async (e: React.FocusEvent<HTMLElement>) => {
    if (!isEditable || !pageContent) return;

    const fieldId = e.currentTarget.id;
    const newText = e.currentTarget.textContent || "";

    // Check if anything actually changed to avoid useless API calls
    if (pageContent[fieldId as keyof PageContent] === newText) return;

    // Create the fresh object immediately
    const nextState = {
      ...pageContent,
      [fieldId]: newText,
    };
    console.log(imageUrl)

    // Update UI state
    setPageContent(nextState);

    // Push the fresh object to Supabase
    await updatePage(nextState);
  };

  if (!pageContent) return <div className="bg-black h-screen text-white p-10">Loading...</div>;

  return (
    <main className="w-full bg-black text-white min-h-screen">
      {/* Admin Indicators */}
      {isEditable && (
        <div className="fixed top-4 right-4 z-50 flex flex-col items-end gap-2">
          <div className="bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
            Admin Mode: Editing Enabled
          </div>
          {isSaving && (
            <div className="text-zinc-400 text-[10px] uppercase tracking-widest">
              Saving to Database...
            </div>
          )}
        </div>
      )}

      {/* Hero Section */}
      <section className="relative w-full h-screen flex items-center justify-center">

        {isEditable &&
          <button className="duration-300 cursor-pointer z-20 absolute right-5 overflow- hover:text-white text-gray-800 hover:scale-110 transition-all group">
            <FaEdit size={42} />
            <input type="file" onChange={file => {
              setHeroImage({ url: file?.target?.files?.[0]! })
              changeImage(file.target.files?.[0]!)
            }
            } className="opacity-0 cursor-pointer w-full -h-full absolute z-50 left-0 top-0 p-10   " />
            <span className="hidden group-hover:block absolute right-12 top-3 whitespace-nowrap bg-zinc-800 px-2 py-1 rounded text-sm">
              change image
            </span>
          </button>
        }
        {previewUrl &&

          <img
            src={previewUrl}
            alt="Hero"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
        }

        <div className="relative z-10 text-center px-6 max-w-xl">
          <h1
            id="title"
            contentEditable={isEditable}
            suppressContentEditableWarning={true}
            onBlur={handleBlur}
            className={`text-4xl font-bold mb-4 outline-none transition-all ${isEditable ? "focus:ring-2 ring-indigo-500 p-2 rounded cursor-text" : "cursor-default"
              }`}
          >
            {pageContent.title}
          </h1>
          <p
            id="description"
            contentEditable={isEditable}
            suppressContentEditableWarning={true}
            onBlur={handleBlur}
            className={`text-base leading-relaxed outline-none transition-all ${isEditable ? "focus:ring-2 ring-indigo-500 p-2 rounded cursor-text" : "cursor-default"
              }`}
          >
            {pageContent.description}
          </p>
        </div>
      </section>

      {/* Secondary Content Section */}
      <section className="w-full px-6 py-20 flex flex-col gap-10 md:flex-row md:items-center md:justify-center max-w-5xl mx-auto">
        <div className="flex-1 space-y-4">
          <h2
            id="content_title"
            contentEditable={isEditable}
            suppressContentEditableWarning={true}
            onBlur={handleBlur}
            className={`text-2xl font-semibold outline-none ${isEditable ? "focus:ring-2 ring-indigo-500 p-1" : ""
              }`}
          >
            {pageContent.content_title}
          </h2>
          <p
            id="content_desc"
            contentEditable={isEditable}
            suppressContentEditableWarning={true}
            onBlur={handleBlur}
            className={`leading-relaxed outline-none ${isEditable ? "focus:ring-2 ring-indigo-500 p-1" : ""
              }`}
          >
            {pageContent.content_desc}
          </p>
        </div>
        <div className="flex-1">
          <img
            src="/design/side.jpeg"
            alt="Design Work"
            className="w-full rounded-xl object-cover max-h-96 shadow-2xl shadow-indigo-500/10"
          />
        </div>
      </section>
    </main>
  );
}
