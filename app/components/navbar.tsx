"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import style from "./navbar.module.css";
import GetUser from "../utils/GetUser";
import { Button } from "@/components/ui/button";
import client from "@/lib/supabaseClient";

export default function Navbar() {
    const pathname = usePathname() || "/";
    const user = GetUser();

    // pages that allow transparent navbar at top
    const transparentPages = ["/content", "/about", "/work"];

    const isTransparentPage = transparentPages.some(
        (page) => pathname === page || pathname.startsWith(page + "/")
    );

    const [hidden, setHidden] = useState(false);
    const [isOnTop, setIsOnTop] = useState(true);
    const lastScrollY = useRef(0);

    /* =====================
       Scroll position logic
    ====================== */
    useEffect(() => {
        const onScroll = () => {
            const currentY = window.scrollY;
            setIsOnTop(currentY === 0);

            if (currentY > lastScrollY.current && currentY > 50) {
                setHidden(true);
            } else {
                setHidden(false);
            }

            lastScrollY.current = currentY;
        };

        window.addEventListener("scroll", onScroll, { passive: true });

        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    /* =====================
       Reset on route change
    ====================== */
    useEffect(() => {
        setHidden(false);
        setIsOnTop(true);
        lastScrollY.current = 0;
    }, [pathname]);

    function signout() {
        client.auth.signOut().then(() => {
            window.location.href = "/login";
        });
    }

    /* =====================
       Style logic
    ====================== */
    const useTransparent = isTransparentPage && isOnTop;

    const linkClass = (href: string) => `
    px-3 py-2 text-xs md:text-sm font-medium uppercase transition-colors duration-200
    ${useTransparent ? "text-white" : "text-black"}
    ${pathname === href ? "border-b-2 border-current" : style.link}
  `;

    return (
        <header
            className={`
        fixed top-0 w-full z-50 transition-all duration-300
        ${hidden ? "-translate-y-full" : "translate-y-0"}
        ${useTransparent ? "bg-transparent" : "bg-white"}
      `}
        >
            <nav className="mx-auto flex md:p-8 p-5 py-4  items-center flex-wrap md:flex-nowrap  md:justify-between">
                {/* Logo */}
                <div className="w-full  flex justify-start items-start">

                    <Link className="hover:-translate-y-4 block  duration-200 transition-all    " href="/">
                        <Image
                            src="/SAM - Logo-01.png"
                            alt="logo"
                            width={150}
                            height={60}
                            priority
                            className={useTransparent ? "invert" : ""}
                        />
                    </Link>

                </div>

                <ul className="flex items-center gap-6 flex-wrap md:flex-nowrap">
                    <li>
                        <Link href="/" className={linkClass("/")}>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/work" className={linkClass("/work")}>
                            Work
                        </Link>
                    </li>
                    <li>
                        <Link href="/about" className={linkClass("/about")}>
                            About
                        </Link>
                    </li>
                    <li>
                        <a href="/#contact" className={linkClass("#contact")}>
                            Contact
                        </a>
                    </li>
                    {/* <li className="bg-blue-500 rounded-full py-[2px]  whitespace-nowrap text-white">
                        <Link style={{ padding: "20px" }} href="/contact" className={("/contact") + " cursor-pointer text-white"}>
                            Start Your Project
                        </Link>
                    </li> */}

                    {user && (
                        <>
                            <li>
                                <Link href="/dashboard" className={linkClass("/dashboard")}>
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Button
                                    onClick={signout}
                                    className={`
                    border px-3 py-2 text-sm uppercase
                    ${useTransparent
                                            ? "border-white text-white"
                                            : "border-black text-black"}
                    bg-transparent hover:bg-transparent
                  `}
                                >
                                    Logout
                                </Button>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header >
    );
}
