import { useEffect, useRef } from "react";

export default function useMount(callback: () => void) {
    const loaded = useRef(false);
    useEffect(() => {
        if (loaded.current) return;
        callback();
        loaded.current = true;
    }, [callback]);
}
