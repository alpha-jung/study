import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function Edit(props :any) {
    const client = await connectDB;
    const db = client.db("forum");

    let result = await db.collection('post').findOne({ _id: new ObjectId(props.params.id) });

    if(result == null) {
        return (
            <div>
                <h4>수정페이지</h4>
                <div>해당 글은 존재하지 않습니다.</div>
            </div>
        )
    } else {
        return (
            <div>
                <h4>수정페이지</h4>

                <form action="/api/edit" method="POST">
                    <input type="hidden" id="_id" name="_id" defaultValue={props.params.id} />

                    <label htmlFor="title">제목</label>
                    <input type="text" id="title" name="title" defaultValue={result.title} /><br />

                    <label htmlFor="content">내용</label>
                    <input type="text" id="content" name="content" defaultValue={result.content} /><br />
                    <button type="submit">작성</button>
                </form>
            </div>
        )
    }
}