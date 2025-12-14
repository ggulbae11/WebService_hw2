import dotenv from "dotenv";
dotenv.config();

import express from "express";
import morgan from "morgan";
import cors from "cors";
import routes from "./routes/index.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";
import rateLimit from "express-rate-limit";
import { requestLogger } from "./middlewares/requestLogger.js";

const app = express();

/* ===== Rate Limit ===== */
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 60,
});

/* ===== Middlewares ===== */
app.use(cors({
  origin: [
    "http://localhost:3000",
    "http://localhost:5173"
  ],
  credentials: true
}));

app.use(express.json());
app.use(requestLogger);
app.use(morgan(":method :url :status :res[content-length] - :response-time ms"));
app.use(limiter);

/* ===== Routes ===== */
app.get("/", (req, res) => {
  res.send("API Server Running");
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    version: "1.0.0",
    buildTime: process.env.BUILD_TIME || "local",
    timestamp: new Date().toISOString()
  });
});

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api", routes);

/* ===== Error Handler (맨 마지막!) ===== */
app.use(errorHandler);

/* ✅ 테스트를 위해 app만 export */
export default app;
