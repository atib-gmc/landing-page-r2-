// components/BillboardHero.js
import { getSinglePost } from '@/lib/actions';
import Image from 'next/image';
import styles from './content.module.css'

// URL Gambar yang telah dicari di internet
// const ILLUSTRATION_URL = "http://googleusercontent.com/image_collection/image_retrieval/9698723849907971949_0";
// const APPSTORE_LOGO_URL = "http://googleusercontent.com/image_collection/image_retrieval/12381743144748118721_0";
// const PLAYSTORE_LOGO_URL = "http://googleusercontent.com/image_collection/image_retrieval/12381743144748118721_1";


const BillboardHero = async ({ params }: { params: { id: string } }) => {
    const { id } = await params
    const { data } = await getSinglePost(id)
    console.log(data?.hero?.url)
    return (
        // Wrapper Hero: Menggunakan Flexbox. Asumsi background (pagar, jalan) adalah background div induk atau elemen di luar komponen ini.
        <>{data ?
            <div className="w-full ">
                <div style={{
                    // backgroundImage: `url(${data?.hero.url})`,
                    backgroundImage: `url("${encodeURI(data?.hero?.url)}")`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center'
                }} className=" w-full flex min-h-screen p-10 justify-start items-end pt-20 relative">
                    <div className="absolute inset-0 bg-black/50    "></div>
                    <div className="text-white max-w-3/4  p-2  md:p-0 mb-10 md:mb-0 md:mr-20">
                        <h3 className='text-2xl font-semibold'>Client:</h3>
                        <h1 className="md:text-7xl text-5xl  font-semibold leading-tight tracking-tighter mb-8">

                            {data?.title}
                        </h1>

                        {/* Deskripsi Pendek */}

                        {/* <img src={data?.hero?.url} /> */}
                        <p className="text-lg mb-6 opacity-90">
                            Subscribe to our newsletter for updates here
                        </p>

                        {/* Link Sosial di bawah */}
                        <div className="flex gap-6 text-sm opacity-90">
                            <span className="underline hover:no-underline cursor-pointer">Instagram</span>
                            <span className="underline hover:no-underline cursor-pointer">Behance</span>
                        </div>
                    </div>
                </div>

                {/* 1. KONTEN KIRI: Teks Utama dan Deskripsi (Area Gelap) */}
                {/* Menggunakan fixed width max-w-[450px] agar mirip dengan porsi di gambar */}
                <main className='flex lg:flex-row flex-col'>

                    <div className="row  grid grid-cols-2 items-center w-full gap-2  md:flex-3 p-8">
                        <div className=" h-20  w-full">
                            <p className='lg:text-3xl text-2xl font-semibold'>Year</p>
                            {/* <p className="text-gray-500 lg:text-2xl text-xl">{data?.date.split('-')[0]}</p> */}
                            <p className="text-gray-500 lg:text-2xl text-xl">{JSON.stringify(data?.date)}</p>
                        </div>

                        <div className=" h-20  w-full">
                            <p className='lg:text-3xl text-2xl font-semibold'>Scope Of Work</p>
                            <p className="text-gray-500 lg:text-2xl text-xl">{data?.scope_of_work}</p>
                        </div>
                        <div className=" h-20  w-full mt-2">
                            <p className='lg:text-3xl text-2xl font-semibold'>Category</p>
                            <p className="text-gray-500 lg:text-2xl text-xl">{data?.categories?.name}</p>
                        </div>
                        <div className=" h-20  w-full">
                            <p className='lg:text-3xl text-2xl font-semibold'>Credit</p>
                            <p className='text-gray-500 lg:text-2xl text-xl' dangerouslySetInnerHTML={{ __html: data?.credit.replace(/\n/g, '<br />') }}></p>
                        </div>

                    </div>
                    <article id='reset' className={`${styles.reset} my-10 px-8 flex-4`} dangerouslySetInnerHTML={{ __html: data?.content }}></article>

                </main>
                <div className="images flex flex-col gap-4 overflow-x-auto py-10 px-8">
                    {data?.images_urls && data.images_urls.map((imgObj: any, index: number) => (
                        <div key={index} className="min-w-[300px] min-h-[200px] flex-shrink-0 rounded-lg overflow-hidden border border-gray-300">
                            {/* {JSON.stringify(imgObj.url)} */}
                            <Image
                                src={imgObj.url}
                                alt={`Gallery ${index}`}
                                width={300}
                                unoptimized
                                height={200}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>


                {/* <Image src="https://picsum.photos/id/237/720/400" alt="Intro GIF" width={700} height={380} className="" /> */}
            </div>
            :
            <div className="flex justify-center items-center h-screen">
                <p className="text-2xl font-semibold">Post not found</p>
            </div>}
        </>
    );
};

export default BillboardHero;