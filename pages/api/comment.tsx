import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { ObjectId } from "mongodb";

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
            
            let comment :string = req.body.comment;
            let parent :string = req.body.parent;
            let author :string | null | undefined = session?.user?.email;

            console.log(parent);

            let data = {
                comment : comment,
                parent : new ObjectId(parent),
                author : author
            };

            if(comment == '') {
                return res.status(500).json('댓글을 입력해주세요.');
            }
    
            try {
                let result :any = await db.collection('comment').insertOne(data);
                result.author = author;

                return res.status(200).json(result);
            } catch(error) {
                console.log(error);
                return res.status(500).json('오류 발생');
            }      
        } else if(req.method == 'GET') {
            const client = await connectDB;
            const db = client.db("forum");

            let parent = new ObjectId(req.query.parent as any);
            
            let result = await db.collection('comment').find({ parent: parent }).toArray();

            return res.status(200).json(result);
        }
    } else {
        return res.status(403).json('로그인 후 이용해주세요.');
    }

    
}