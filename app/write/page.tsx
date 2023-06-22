export default function Write() {
    return (
        <div>
            <h4>글 작성</h4>

            <form action="/api/write" method="POST">
                <label htmlFor="title">제목</label>
                <input type="text" id="title" name="title" /><br />

                <label htmlFor="content">내용</label>
                <input type="text" id="content" name="content" /><br />
                <button type="submit">작성</button>
            </form>
        </div>
    )
}