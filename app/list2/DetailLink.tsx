'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation"

export default function DetailLink() {
    let router = useRouter();
    let url = usePathname();    // 현재 URL 출력
    let query = useSearchParams();  // Search Parameter 출력

    /**
     * router.back() => 뒤로 가기
     * router.forward() => 앞으로 가기
     * router.refresh() => 새로고침 ( 변동사항 있는 일부분만 바꿔줌 (soft refresh) )
     * router.prefetch() => 페이지 미리 로드
     *  > Link 태그에도 prefetch 기능이 내장되어 있음
     */

    return (
        <button onClick={() => { router.push('/list') }}>이동</button>
    )
}