import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import Comment from "./Comment";

import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function Detail(props: any) {
    let session = await getServerSession(authOptions);

    if(session) {
        const client = await connectDB;
        const db = client.db("forum");

        let result = await db.collection('post').findOne({ _id: new ObjectId(props.params.id) });

        if (result == null) {
            return (
                <div>
                    <h4>상세페이지</h4>
                    <div>해당 글은 존재하지 않습니다.</div>
                </div>
            )
        } else {
            return (
                <div>
                    <h4>상세페이지</h4>
                    <h4>{result.title}</h4>
                    <p>{result.content}</p>
                    <Comment _id={result._id.toString()}></Comment>
                </div>
            )
        }
    } else {
        return (
            <div>로그인 후 이용해주세요.</div>
        )
    }
    
}