/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable no-underscore-dangle */
import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client;

const getClientPromise = () => {
    if (process.env.NODE_ENV === 'development') {
        // In development mode, use a global variable so that the value
        // is preserved across module reloads caused by HMR (Hot Module Replacement).
        const globalWithMongo = global;

        if (!globalWithMongo._mongoClientPromise) {
            client = new MongoClient(uri, options);
            globalWithMongo._mongoClientPromise = client.connect();
        }

        return globalWithMongo._mongoClientPromise;
    }
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(uri, options);

    return client.connect();
};

const clientPromise = getClientPromise();

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;
