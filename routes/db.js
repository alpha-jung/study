const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

let url = process.env.DB_URL;

const MongoOptions = {
    useNewUrlParser : true,
    useUnifiedTopology : true,
    family : 4
}

let db;

// MongoClient.connect(url)
//     .then(database => {
//         // console.log(database);

//         db = database.db('todoapp');

//         console.log(db);

//         module.exports = db;
        
//         // return db;

//         // let data = { name : 'John', age : 20, _id : 100 };

//         // db.collection('post').insertOne(data, function(error, result) {
//         //     console.log('save complete');
//         // });

//         // db.colleult => {
//         //     consolction('post').insertOne(data)
//         // .then(rese.log("save");
//         //     console.log(result);
//         // })
//         // .catch(err => {
//         //     console.log(err);
//         // });
//     })
//     .catch(err => {
//         console.log(err);
//     });


const connectDb = (callback) => {
    if (db) return callback();

    MongoClient.connect(url)
    .then(database => {
        db = database.db('todoapp');
        callback();
    })
    .catch(err => {
        return console.log(err);
    }); 
}

const getDb = () => {
    return db;
}

module.exports = {
    connectDb,
    getDb,
}