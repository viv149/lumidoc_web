'use client'
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const useAuth = () => {
    const router = useRouter();

    useEffect(() => {
        const token = getCookie("token");

        if (!token) {
            router.push("/admin/login");
        }
    }, [router]);
};

export default useAuth;
