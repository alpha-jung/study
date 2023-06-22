import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req :NextApiRequest, res :NextApiResponse) {
    if(req.method == 'GET') {
        let date = new Date();

        return res.status(200).json(date);
    }
}