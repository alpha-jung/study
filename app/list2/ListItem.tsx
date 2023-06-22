'use client'
import Link from "next/link";
import DetailLink from "./DetailLink";
import axios from "axios";


export default function ListItem({result} : any) {
    let postDelete = (_id :string, e :any) => {
        axios.post('/api/delete', {
            _id: _id
        })
        .then((res) => {
            console.log(res);
            e.target.parentElement.style.opacity = 0;

            setTimeout(() => {
                e.target.parentElement.style.display = 'none';
            }, 1000);
        })
        .catch((err) => {
            console.log(err);
        });

        fetch('/api/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({_id: _id})
        })
        .then((res) => {
            console.log(res);
            e.target.parentElement.style.opacity = 0;

            setTimeout(() => {
                e.target.parentElement.style.display = 'none';
            }, 1000);
        })
        .catch((err) => {
            console.log(err);
        });
    }


    let test = () => {
        axios.delete('/api/test?age=20')
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    return (
        <div>
        {
            result.map((a :any, i :number) => 
                <div className="list-item" key={i}>
                    <h4><Link prefetch={false} href={`/detail/${result[i]._id}`}>{result[i].title}</Link></h4>
                    <p>{result[i].content}</p>
                    <Link href={`/edit/${result[i]._id}`}>✏️</Link>
                    <span onClick={(e) => postDelete(`${result[i]._id}`, e)}>🗑</span> <br />
                    <DetailLink></DetailLink>
                    <button onClick={(() => { test() })}>테스트</button>
                </div>
            )
        }
        </div>
    )
}