"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/actions/auth.action";
import { useUserStore } from "@/store";


export default function Layout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const fetchUser = useUserStore((state) => state.fetchUser);

    useEffect(() => {
        let isActive = true;

        const check = async () => {
            const ok = await isAuthenticated();

            if (!ok && isActive) {
                router.replace("/");
            }

            if (ok && isActive) {
                await fetchUser();
            }
        };


        check();


        const interval = setInterval(check, 10000);

        return () => {
            isActive = false;
            clearInterval(interval);
        };
    }, [router]);

    return <>{children}</>;
}