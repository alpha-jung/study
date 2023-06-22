import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req :NextApiRequest, res :NextApiResponse) {
    let session = await getServerSession(req, res, authOptions);
    
    if(session) {
        if(req.method == 'POST') {
            const client = await connectDB;
            const db = client.db("forum");
    
            let _id :string = req.body._id;
            console.log(_id);
    
            if(_id == '') {
                return res.status(500).json('잘못된 요청입니다.');
            }
    
            try {
                let post = await db.collection('post')
                .findOne({ _id: new ObjectId(_id) });

                console.log(post);

                if(post && post.author == session?.user?.email) {
                    let result = await db.collection('post')
                        .deleteOne({ _id: new ObjectId(_id) });

                    console.log(result);

                    if (result.deletedCount > 0) {
                        return res.status(200).json('삭제 완료');
                    } else {
                        return res.status(400).json('삭제 실패');
                    }
                } else {
                    return res.status(403).json('해당 게시글을 삭제할 권한이 없습니다.');
                }
            } catch(error) {
                console.log(error);
                return res.status(500).json('오류 발생');
            }        
        }
    } else {
        return res.status(403).json('로그인 후 이용해주세요.');
    }

    
}