'use client'

import { signIn } from 'next-auth/react';
// import { useEffect } from 'react';

export default function LoginBtn() {
    // useEffect(() => {
    //     if(typeof window != 'undefined') {
    //         localStorage.setItem('dark', 'Y');
    //     }
    // }, [])

    return (
        <button onClick={() => { signIn() }}>Login</button>
    )
}