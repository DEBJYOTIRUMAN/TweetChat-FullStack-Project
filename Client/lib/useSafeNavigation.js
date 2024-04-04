import { useRouter } from "next/router";
import { useState } from "react";

export const useSafeNavigation = () => {
    const [isPushing, setIsPushing] = useState(false);
    const router = useRouter();

    const safePush = async (path) => {
        if (isPushing) return;
        setIsPushing(true);
        try {
            await router.push(path);
        } finally {
            setIsPushing(false);
        }
    };

    return safePush;
};