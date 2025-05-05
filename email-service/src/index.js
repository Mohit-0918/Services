require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const emailRoutes = require("./routes/emailRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/email", emailRoutes);

app.get("/health", async (req, res) => {
    const mongoState = mongoose.connection.readyState;
    const status = mongoState === 1 ? "Connected" : "Disconnected";
    res.status(200).json({ status: "OK", mongoDB: status });
});

const PORT = process.env.PORT || 3001;

if (!process.env.MONGO_URI) {
    console.error("MONGO_URI is not defined in the environment variables.");
    process.exit(1);
}

if (process.env.NODE_ENV !== "test") {
    console.log("Connecting to MongoDB...");
    console.log(`MongoDB URI: ${process.env.MONGO_URI}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
    console.log(`Port: ${PORT}`);
    mongoose
        .connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
        })
        .then(() => {
            console.log("Connected to MongoDB");
            app.listen(PORT, (err) => {
                if (err) {
                    console.error(`Failed to start server: ${err.message}`);
                } else {
                    console.log(`Email service running on port ${PORT}`);
                }
            });
        })
        .catch((err) => {
            console.error("MongoDB connection error:", err.message);
            console.error(err.stack);
        });
}

process.on("SIGINT", async () => {
    console.log("Shutting down gracefully...");
    await mongoose.connection.close();
    process.exit(0);
});

module.exports = app;
