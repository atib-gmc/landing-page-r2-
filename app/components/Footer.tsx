// components/Footer.js
import Link from 'next/link';

const Footer = () => {
    // Menggunakan warna background gelap sesuai gambar referensi
    const bgColor = '#121212';

    return (
        <footer style={{ backgroundColor: bgColor }} className="text-white font-sans">
            <div className="max-w-7xl mx-auto py-16 px-8 lg:px-12">

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">

                    {/* Left Section: Your Adventure Companion Text */}
                    <div className="md:col-span-5">
                        <h1 className="text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight">
                            Your<br />
                            Adventure<br />
                            Companion<span className="text-xl align-top ml-1">™</span>
                        </h1>
                    </div>

                    {/* Middle Section: Reach Us */}
                    <div className="md:col-span-3 pt-2">
                        <h3 className="text-lg font-semibold mb-4 text-gray-200">Reach us</h3>
                        <div className="space-y-1">
                            <Link
                                href="mailto:Creative@Samsara.co.id"
                                className="block text-gray-400 hover:text-white transition-colors tracking-wide"
                            >
                                Creative@Samsara.co.id
                            </Link>
                            <p className="text-gray-400 tracking-wide">
                                Teguh : +6283812345678
                            </p>
                        </div>
                    </div>

                    {/* Right Section: Network */}
                    <div className="md:col-span-4 pt-2">
                        <h3 className="text-lg font-semibold mb-4 text-gray-200">Network</h3>
                        <nav className="flex flex-wrap gap-x-4 gap-y-2 text-gray-400">
                            <a href="https://www.instagram.com/samsaracreative_" target="_blank" className="hover:text-white transition-colors">Instagram</a>
                            <span className="text-gray-600">|</span>
                            <a href="https://www.behance.net/Samagency_/moodboards" target="_blank" className="hover:text-white transition-colors">Behance</a>
                            <span className="text-gray-600">|</span>
                        </nav>
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;