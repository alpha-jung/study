import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
    const session = await getToken({req : req});

    req.cookies.get('');    // 쿠키 출력
    req.cookies.has('');    // 쿠키 존재 확인
    req.cookies.delete(''); // 쿠키 삭제

    // const response = NextResponse.next();
    // response.cookies.set({
    //     name: 'mode',
    //     value: 'dark',
    //     maxAge: 3600,
    //     httpOnly: true   // 자바스크립트로 쿠키 조작 방지
    // });

    // return response;

    if(req.nextUrl.pathname.startsWith('/write')) {
        if(session == null) {
            return NextResponse.redirect(new URL('http://localhost:3000/api/auth/signin'));
        }
    }

    if(req.nextUrl.pathname.startsWith('/list')) {
        console.log(new Date());
        console.log(req.headers.get('sec-ch-ua-platform'));
        return NextResponse.next();
    }
}