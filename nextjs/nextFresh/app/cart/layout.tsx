import Link from 'next/link'
import { Inter } from 'next/font/google'

/**
 * layout.tsx(.js)
 * page.tsx(.js) 를 감싸는 파일
 * 공유하고 싶은 내용 작성 (ex 상단 메뉴)
 * 같은 폴더에 layout.tsx(.js) 가 있을 경우, 해당 layout 으로 page 감쌈
 * 없을 경우, 상위에 있는 layout 으로 page 감쌈
 * 
 */

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <p>현대카드 무이자이벤트중</p>
        {children}
      </body>
    </html>
  )
}