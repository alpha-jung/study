import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/util/database";

export default async function handler(req :NextApiRequest, res :NextApiResponse) {
    if(req.method == 'POST') {
        const client = await connectDB;
        const db = client.db("forum");
        
        let userId :string = req.body.userId;
        let userPwd :string = req.body.userPwd;

        if(userId == '') {
            return res.status(500).json('ID를 입력해주세요.');
        } else if(userPwd == '') {
            return res.status(500).json('비밀번호를 입력해주세요.');
        }

        try {
            let isExist = await db.collection('join').findOne({ "userId": userId });

            if(isExist == null) {
                let result = await db.collection('join').insertOne({ "userId": userId, "userPwd": userPwd });

                if (result.acknowledged) {
                    return res.status(200).json("회원가입 완료");
                }
            } else {
                return res.status(200).json('이미 존재하는 ID입니다.');
            }
        } catch(error) {
            console.log(error);
            return res.status(500).json('오류 발생');
        }        
    }
}