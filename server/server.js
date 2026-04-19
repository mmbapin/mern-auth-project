import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";

const app = express();
const PORT = process.env.PORT || 4000;
await connectDB();

app.use(express.json());
app.use(cors());
app.use(cookieParser({credentials: true}));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});





