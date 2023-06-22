'use client'

import axios from "axios";
import { useEffect, useState } from "react"

export default function Comment({ _id }: {_id :string}) {
    let [comment, setComment] = useState('');
    let [data, setData] = useState([]);

    useEffect(() => {
        axios.get('/api/comment', {
            params: {
                parent: _id
            }
        })
        .then(res => {
            console.log(res);
            setData(res.data);
        })
        .catch(err => {
            console.log(err);
        });
    }, []);

    let commentRegist = () => {
        let commentObj: any = {
            comment: comment,
            parent: _id
        };

        axios.post('/api/comment', commentObj)
        .then(res => {
            console.log(res);

            commentObj._id = res.data.insertedId;

            let copyData :any = [...data];
            copyData.push(commentObj);

            setData(copyData);
        })
        .catch(err => {
            console.log(err);
        });
    }

    return (
        <div>
            <div>
                <h2>댓글 목록</h2>
                <div id="commentList" style={{ width:'100%', height: 'auto', border: '1px solid black' }}>
                    {
                        data.length > 0 ?
                        data.map((a :any, i :number) => {
                            return (
                                <p key={i}>{a.comment}</p>
                            )
                        })
                        :
                        <p>댓글 없음</p>
                    }
                </div>
            </div>
            <input onChange={(e) => { setComment(e.target.value) }} />
            <button onClick={() => { commentRegist() }}>댓글 작성</button>
        </div>
    )
}