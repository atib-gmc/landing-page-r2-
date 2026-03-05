"use client";
import { motion } from "motion/react"
import Image from "next/image";
import ArticleGrid from "./components/Projects";

export default function Home() {

  return (<div className="flex min-h-screen px-12 items-center justify-center  font-sans ">
    <main className="min-h-screen flex w-full mt-10  flex-col items-center justify-between py-10  sm:items-start">
      <div className="hero bg-white mb-10 ">
        <Image src="/intro-light.gif" quality={70} alt="Intro GIF" unoptimized width={700} height={380} className="mx-auto scale-200 md:scale-150 xl:scale-200 md:pt-8.54 pt-14 45 zx pb-20 min-h-screen " />
        <div className="intos flex gap-4 md:flex-row flex-col   mt-8 flex-wrap relative">
          <div className="row flex-2  flex">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{
                opacity: 1, y: 0,
                transition: { duration: 0.8, ease: "easeOut", delay: 0.3, }
              }}
              viewport={{ once: true }}
              className="  mb-10 text-black text-start text-sm ">

              "Inspired by the concept of Samsara, the ever-repeating cycle of rebirth, we see a brand's journey as a dynamic and continuous process. <br /> <br />

              We embrace the Four Stages of Samsara: Birth, Growth, Evolution and Rebirth. Each marking a critical step from entering the market, building presence and refining through insight to emerging stronger than before. In moments of uncertainty, we step in as your adventure companion. We’re there by your side, filling the gaps, sharing the journey, and helping you reach your fullest potential."
            </motion.p>
            {/* <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{
                opacity: 1, x: 0,
                transition: { duration: 0.8, ease: "easeOut", delay: 0.3, }
              }}
              viewport={{ once: true }}
            >
              <Image src="/typo/p.jpeg" alt="Intro Image" width={400} height={300} className="rounded-xl object-cover w-full max-w-2xl opacity-90" />
            </motion.div> */}
          </div>

          <div className="row border-l-2  border-black flex-1  px-10 ">
            <h3 className="text-xl font-semibold py-2 text-[#252525]">Our Clients :</h3>
            <div className="flex  gap-2 md:justify-start md:items-center justify-start items-center ">
              <div className="socials-links w-14 h-14 rounded-md bg-gray-400"></div>
              <div className="socials-links w-14 h-14 rounded-md bg-gray-400"></div>
              <div className="socials-links w-14 h-14 rounded-md bg-gray-400"></div>
              <div className="socials-links w-14 h-14 rounded-md bg-gray-400"></div>

            </div>

          </div>
          {/* <motion.div
            // 1. Framer Motion handles the initial state (opacity: 0, y: 20)
            initial={{ opacity: 0, y: 20 }}
            whileInView={{
              // 2. Framer Motion handles the final state (opacity: 1, y: 0)
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.8,
                ease: "easeOut",
                delay: 0.3,
              }
            }}
            viewport={{ once: true }}

            // 3. Keep only the structural and positioning styles here
            className="absolute xl:top-1/4 md:top-2/5 left-2/4 -translate-x-2/4 z-10"
          >
            <Image
              src="/typo/y.jpeg"
              alt="Intro Image"
              width={300}
              height={300}
              // 4. REMOVE the conflicting 'opacity-0' and 'md:opacity-100' classes
              className="rounded-xl object-cover shadow-2xl shadow-black"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{
              opacity: 1, x: 0,
              transition: { duration: 0.8, ease: "easeOut", delay: 0.3, }
            }}
            viewport={{ once: true }}
          >
            <Image src="/typo/t.jpeg" alt="Intro Image" width={400} height={300} className="rounded-xl  object-cover opacity-90" />
          </motion.div> */}

        </div>
      </div>
      {/* <Slider /> */}
      <ArticleGrid />
      <section id="contact" className="w-full text-gray-900 py-20 px-8">
        <div className=" mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch justify-items-stretch">

          {/* LEFT — CONTACT FORM */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Contact Me</h2>
            <p className="text-gray-700 text-sm">
              If you have a project in mind or want to collaborate, feel free to send me a message.
            </p>

            <form className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Name</label>
                <input
                  type="text"
                  className="w-full border border-neutral-700 rounded-lg px-4 py-2 focus:outline-none focus:border-white"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Email</label>
                <input
                  type="email"
                  className="w-full  border border-neutral-700 rounded-lg px-4 py-2 focus:outline-none focus:border-white"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Message</label>
                <textarea
                  rows={4}
                  className="w-full border border-neutral-700 rounded-lg px-4 py-2 focus:outline-none focus:border-white"
                />
              </div>

              <button
                type="submit"
                className="w-full md:w-auto bg-white text-black px-6 py-2 rounded-lg font-medium hover:bg-gray-200 transition"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* RIGHT — IMAGE / ILLUSTRATION */}
          <div className="flex justify-center md:justify-end">
            <img
              src="/design/contact.jpeg"
              alt="Contact"
              className="w-full max-w-sm md:max-w-md rounded-xl object-cover opacity-90"
            />
          </div>

        </div>
      </section>
    </main>
  </div>
  );
}
