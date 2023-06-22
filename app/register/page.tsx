export default function Register() {
    return (
        <div>
            <form method="POST" action="/api/auth/signup">
                <input name="name" type="text" placeholder="이름" /><br />
                <input name="email" type="text" placeholder="이메일" /><br />
                <input name="password" type="text" placeholder="비밀번호" /><br />
                <button type="submit">가입 요청</button>
            </form>
        </div>
    )
}