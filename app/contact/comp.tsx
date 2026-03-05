"use client"

export default function ContactPage() {
    return (
        <section className="w-full  text-gray-900 py-20 md:px-32 px-6">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

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
    )
}
