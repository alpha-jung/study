import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/util/database";

export default async function handler(req :NextApiRequest, res :NextApiResponse) {
    if(req.method == 'GET') {
        const client = await connectDB;
        const db = client.db("forum");
        let result = await db.collection('post').find().toArray();

        return res.status(200).json(result);
    }
}