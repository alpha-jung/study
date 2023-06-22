import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(
    req :NextApiRequest,
    res :NextApiResponse
) {
    let session = await getServerSession(req, res, authOptions);
    // console.log(session);

    if(session) {
        if(req.method == 'POST') {
            const client = await connectDB;
            const db = client.db("forum");
            
            let title :string = req.body.title;
            let content :string = req.body.content;
            let author :string | null | undefined = session?.user?.email;
            let data = {
                title : title,
                content : content,
                author : author
            };

            if(title == '') {
                return res.status(500).json('제목을 입력해주세요.');
            }
    
            try {
                let result = await db.collection('post').insertOne(data);
    
                res.redirect(307, '/list');
            } catch(error) {
                console.log(error);
                return res.status(500).json('오류 발생');
            }        
        }
    } else {
        return res.status(403).json('로그인 후 이용해주세요.');
    }

    
}