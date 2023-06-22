import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/util/database";
import bcrypt from 'bcrypt';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if(req.method == 'POST') {
        if(req.body.email == '') {
            return res.status(400).json('이메일을 입력해주세요.');
        } else if(req.body.password == '') {
            return res.status(400).json('비밀번호를 입력해주세요.');
        } else {
            const client = await connectDB;
            const db = client.db("forum");

            let user = await db.collection("user_cred").findOne({ email: req.body.email });

            if(user) {
                return res.status(400).json('이미 존재하는 이메일입니다.');
            } else {
                let hash = await bcrypt.hash(req.body.password, 10);
                console.log(hash);

                req.body.password = hash;

                await db.collection("user_cred").insertOne(req.body);

                return res.status(200).json('가입 성공');
            }
        }
    }
}