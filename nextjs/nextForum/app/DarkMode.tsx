'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export default function DarkMode() {
    let router = useRouter();
    let [mode, setMode] = useState('');

    useEffect(() => {
        let cookieValue = ('; ' + document.cookie).split('; mode=').pop()?.split(';')[0];

        if(cookieValue == '') {
            document.cookie = 'mode=light; max-age=' + (3600 * 24 * 400);
        }
    }, []);

    let changeDarkMode = () => {
        let cookieValue = ('; ' + document.cookie).split('; mode=').pop()?.split(';')[0];

        if(cookieValue == 'light') {
            document.cookie = 'mode=dark; max-age=' + (3600 * 24 * 400);
        } else {
            document.cookie = 'mode=light; max-age=' + (3600 * 24 * 400);
        }
    
        router.refresh();
        setMode(cookieValue as string);
    }

    return (
        <span onClick={() => { changeDarkMode() }}>
            {
                mode == 'dark' ? <span>☀️</span> : <span>🌙</span>
            }
        </span>
    )
}