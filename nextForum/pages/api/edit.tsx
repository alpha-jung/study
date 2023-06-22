import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req :NextApiRequest, res :NextApiResponse) {
    if(req.method == 'POST') {
        const client = await connectDB;
        const db = client.db("forum");
        
        let _id :string = req.body._id;
        let title :string = req.body.title;
        let content :string = req.body.content;

        if(_id == '') {
            return res.status(500).json('잘못된 요청입니다.');
        }

        if(title == '') {
            return res.status(500).json('제목을 입력해주세요.');
        }

        try {
            let result = await db.collection('post')
            .updateOne({ _id: new ObjectId(_id) }, 
            {$set : { "title": title, "content": content }});

            if (result.acknowledged) {
                return res.status(200).json("수정 완료");
            }
        } catch(error) {
            console.log(error);
            return res.status(500).json('오류 발생');
        }        
    }
}