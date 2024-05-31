import mongoose from "mongoose";

const url = "mongodb+srv://shaadivyah:Shaadivyah2024@cluster0.1mhstu8.mongodb.net/ShaadiVyah?retryWrites=true&w=majority&appName=Cluster0";

const db = async () => {
    if (mongoose.connection.readyState >= 1) {
        return;
    }

    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to the database");
    } catch (error) {
        console.log("Error connecting to the database", error);
        throw error;
    }
};

export default db;
