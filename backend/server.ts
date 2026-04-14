import express from "express"

import helmet from "helmet"
import morgan from "morgan"
import cors from "cors"

import dotenv from "dotenv"
import { initDB } from "./config/db"

import appointmentsRoutes from "./routes/appointmentsRoutes"
import authRoutes from "./routes/authRoutes"
dotenv.config()

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());    // Parse incoming JSON requests into JavaScript Object
app.use(cors());            // Headers that allows frontend to talk to backend (cross-origin requests from the frontend)
app.use(helmet());          // Headers that protects against common vulnerabilities (HTTP Security)
app.use(morgan("dev"));     // Logs every incoming request to terminal

// Routes
app.get("/", (req, res) => {
    res.send("Backend Working")
});

app.use("/appointments", appointmentsRoutes);
app.use("/auth", authRoutes)

async function startServer() {
    await initDB();
    app.listen(PORT, () => {
        console.log("Server is running on port " + PORT);
    });
}

startServer()