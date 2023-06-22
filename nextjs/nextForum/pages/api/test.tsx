import type { NextApiRequest, NextApiResponse } from "next";


/**
 * /api/[파일명] 방식으로 호출
 * 
 * 
 */

export default async function handler(req :NextApiRequest, res :NextApiResponse) {
    if(req.method == 'POST') {
        return res.status(200).json('hello');
    } else if(req.method == 'DELETE') {
        console.log(req.query);
    }
}