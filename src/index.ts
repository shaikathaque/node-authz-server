import express, { Express } from "express";
import logger from './config/logger';

const app: Express = express();
const port = process.env.PORT || 3000;

// Basic middleware for parsing JSON payloads
app.use(express.json());

// Health check route
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
