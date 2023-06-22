import { connectDB } from "@/util/database";
import ListItem from "./ListItem";

export const revalidate = 20;

export default async function List() {

    const client = await connectDB;
    const db = client.db("forum");
    let result = await db.collection('post').find().toArray();
    result = result.map((a) => {
        let obj :any = {...a};
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
}