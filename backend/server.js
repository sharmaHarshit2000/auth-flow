import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();
const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());



app.get("/", (req, res) => {
    res.send("Auth API is running...")
})

app.use("/api/auth", authRoutes);


app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
