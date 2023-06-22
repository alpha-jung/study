import { MongoClient } from "mongodb"

const url = 'mongodb://localhost:27017';

const options = {
    useNewUrlParser : true,
    useUnifiedTopology : true,
    family : 4
};

let connectDB :Promise<MongoClient>;

if(process.env.NODE_ENV === 'development') {
    connectDB = new MongoClient(url, options).connect();

    // if(!global._mongo) {
    //     global._mongo = new MongoClient(url, options).connect();
    // }

    // connectDB = global._mongo;
} else {
    connectDB = new MongoClient(url, options).connect();
    console.log(connectDB);
}

export { connectDB }
