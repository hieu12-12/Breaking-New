const { MongoClient } = require("mongodb");

async function listCollections() {
    // Replace with your MongoDB connection details
    const uri = "mongodb+srv://test2:Ch8016kit@cluster0.rtuwu.mongodb.net/breaking-new";
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Access the database
        const db = client.db("breaking-new"); // Replace with your database name

        // List all collections
        const collections = await db.listCollections().toArray();
        console.log("Collections:");
        collections.forEach((collection) => console.log(collection.name));
    } catch (err) {
        console.error("Error listing collections:", err);
    } finally {
        // Close the connection
        await client.close();
    }
}

listCollections().catch(console.error);
