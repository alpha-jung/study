import { connectDB } from "@/util/database";
import ListItem from "./ListItem";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

// static rendering 된 페이지를 강제로 dynamic rendering 으로 바꾸는 방법
export const dynamic = 'force-dynamic';

export default async function List() {
    let session = await getServerSession(authOptions);

    if(session) {
        const client = await connectDB;
        const db = client.db("forum");
        let result = await db.collection('post').find().toArray();
        result = result.map((a) => {
            let obj: any = { ...a };
            delete obj['_id'];

            obj._id = a._id.toString();

            return obj;
        });

        return (
            // <div className="list-bg">
            //     {
            //         // result.map((a, i) => 
            //         //     <div className="list-item" key={i}>
            //         //         <h4><Link prefetch={false} href={`/detail/${result[i]._id}`}>{result[i].title}</Link></h4>
            //         //         <p>{result[i].content}</p>
            //         //         <Link href={`/edit/${result[i]._id}`}>✏️</Link> <br />
            //         //         <DetailLink></DetailLink>
            //         //     </div>
            //         // )
            //     }
            // </div>

            <div className="list-bg">
                <ListItem result={result}></ListItem>
            </div>
        )
    } else {
        return (
            <div>로그인 후 이용해주세요.</div>
        )
    }

    
}