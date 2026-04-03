"use client";

import { client } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";
import { User } from "@supabase/auth-js/dist/module/lib/types";

/**
 * Hook untuk mengambil data user dari Supabase Auth.
 * Returns:
 * - undefined: Sedang memuat (loading/checking session)
 * - null: Sesi selesai dicek dan user TIDAK login
 * - User object: User berhasil login
 */
export default function GetUser(): User | null | undefined {
  // 1. Inisialisasi dengan 'undefined' (Status: Loading)
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    // Fungsi untuk mengecek user saat pertama kali halaman dimuat
    const getInitialUser = async () => {
      try {
        const {
          data: { user: supabaseUser },
          error
        } = await client.auth.getUser();

        if (error) {
          console.error("Error fetching user:", error.message);
          setUser(null);
          return;
        }

        // Set ke null jika tidak ada, atau set ke objek user jika ada
        setUser(supabaseUser ?? null);
      } catch (err) {
        console.error("Unexpected error:", err);
        setUser(null);
      }
    };

    getInitialUser();

    // 2. Listen untuk perubahan status auth (Login, Logout, Token Refresh)
    const {
      data: { subscription },
    } = client.auth.onAuthStateChange((event, session) => {
      console.log("Auth Event:", event);

      if (session?.user) {
        setUser(session.user);
      } else {
        // Jika event adalah SIGNED_OUT atau session habis
        setUser(null);
      }
    });

    // Cleanup subscription saat komponen tidak lagi digunakan (unmount)
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  // Mengembalikan status user (bisa undefined, null, atau User)
  return user;
}
