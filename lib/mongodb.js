import { MongoClient } from "mongodb";

if(!process.env.MONGODB_URI){
    throw new Error(`"Invalid/Missing env variable: ${MongoDB_URI}`)
}

const uri = process.env.MONGODB_URI
const option = {}

let client
let clientPromise

if(process.env.NODE_ENV === 'developement'){
    // in development mode, use a global variable so that the value is
    // prederved across module reloads caused by HMR (hot module replacement).

    if(!global._mongoClientPromise){
        client = new MongoClient(uri, option)
        global._mongoClientPromise = client.connect()
    }

    clientPromise = global._mongoClientPromise
}else{
    client = new MongoClient(uri,option)
    clientPromise = client.connect()
}

// Export  a module-scoped MongoClient promise. By this doing this in a seperate module,
// the client can be shared across functions.

export default clientPromise