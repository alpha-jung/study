import Link from "next/link";

export default function Home() {
  let name :string = 'jeung';
  let link :string = 'https://google.com';

  return (
    <div>
      <h4 style={{ color: 'red', fontSize: '30px' }} className="title">애플 후레쉬</h4>
      <p className="title-sub">by dev {name}</p>
      <a href={link}>링크</a>
    </div>
  )
}
