export default function Join() {
    return (
        <div>
            <h4>회원가입</h4>

            <form action="/api/join" method="POST">
                <label htmlFor="userId">ID</label>
                <input type="text" id="userId" name="userId" /><br />

                <label htmlFor="userPwd">비밀번호</label>
                <input type="text" id="userPwd" name="userPwd" /><br />
                <button type="submit">가입</button>
            </form>
        </div>
    )
}