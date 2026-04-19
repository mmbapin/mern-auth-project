import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoute.js";

const app = express();
const PORT = process.env.PORT || 4000;
await connectDB();

app.use(express.json());
app.use(cors());
app.use(cookieParser({credentials: true}));

///API Endpoints
app.get('/', (req, res) => {
    res.send("API Working");
})
app.use('/api/auth', authRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});





